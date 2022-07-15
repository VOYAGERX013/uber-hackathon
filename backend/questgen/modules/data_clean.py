import spacy
import re
from allennlp.predictors.predictor import Predictor

nlp = spacy.load("en_core_web_sm")
model_url = "https://storage.googleapis.com/allennlp-public-models/coref-spanbert-large-2020.02.27.tar.gz"
# predictor = Predictor.from_path(model_url)

def remove_unwanted_words(text):
    unwanted_texts = ["nothing but", "with the sole purpose of", "with the only purpose of", "with the purpose of", "with the objective of", "with the goal of", "hopefully", "however", "unfortunately", "fortunately"]
    for texts in unwanted_texts:
        text = text.replace(texts, "")

    return text

def clean(text):
    # co_reference_text = predictor.coref_resolved(text).replace(",", "").replace(";", ".").replace("\n", " ")
    co_reference_text = text.replace(",", "").replace(";", ".").replace("\n", " ")
    
    refined_text = remove_unwanted_words(co_reference_text)
    refined_text = re.sub(' +', ' ', refined_text)
    return refined_text.lower()

def fix_punctuation(text):
    def sentence_case(text):
        sentences = re.findall(r'(?:\d+\.\d+|\b[A-Z](?:\.[A-Z])*\b\.?|[^.!?])+[.!?](?:\s|\Z)', text)
        sentences = [x[0].upper() + x[1:] for x in sentences]
        return ''.join(sentences)
    
    text = re.sub(r'(\d+\.\d+|\b[A-Z](?:\.[A-Z])*\b\.?)|([.,;:!?)])\s*', lambda x: x.group(1) or f'{x.group(2)} ', text)
    return sentence_case(text)