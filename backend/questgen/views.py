from .modules import script_extract, data_clean, summarize, engine, mcq_gen, text_quest_gen
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import spacy
from transformers import *

nlp = spacy.load("en_core_web_sm")

model = PegasusForConditionalGeneration.from_pretrained("tuner007/pegasus_paraphrase")
tokenizer = PegasusTokenizerFast.from_pretrained("tuner007/pegasus_paraphrase")

class Link(APIView):

    def post(self, request):
        link = request.data["link"]

        content = script_extract.get_content(link)
        clean_data = data_clean.clean(content)
        
        summarized_data = summarize.summarize(clean_data, 0.4)
        summarized_data = data_clean.fix_punctuation(summarized_data)

        doc = nlp(summarized_data)

        sent_types = []
        sents = []

        for sent in doc.sents:
            sent_types.append(text_quest_gen.engine(sent.text))
            sents.append(sent.text)
        
        questions = []
        for sent in range(0, len(sents)):
            if sent_types[sent] == "wav":
                questions.append(text_quest_gen.wav_(sents[sent]))
            elif sent_types[sent] == "waa":
                questions.append(text_quest_gen.waa_(sents[sent]))

        questions = text_quest_gen.remove_empty(questions)

        for idx in range(0, len(questions)):
            questions[idx] = text_quest_gen.paraphrase_sentence(True, model, tokenizer, questions[idx], num_beams=10, num_return_sequences=10)

        response = Response()
        response.data = {
            "questions": questions
        }

        return response

class Text(APIView):
    def post(self, request):
        return Response()
            