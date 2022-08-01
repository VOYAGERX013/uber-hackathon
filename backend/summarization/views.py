from questgen.modules import summarize, script_extract, data_clean, text_quest_gen
from rest_framework.views import APIView
from rest_framework.response import Response
import spacy
from transformers import PegasusForConditionalGeneration, PegasusTokenizer

nlp = spacy.load("en_core_web_sm")
tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")


class Link(APIView):
    def post(self, request):
        response = Response()
        print("Hit the route")
        # try:
        link = request.data["link"]

        content = script_extract.get_content(link)
        clean_data = data_clean.clean(content)
        
        summarized_data = summarize.summarize(clean_data, 0.4)
        summarized_data = data_clean.fix_punctuation(summarized_data)
        doc = nlp(summarized_data)
        sentences = []
        for sent in doc.sents:
            sentences.append(sent.text)

        response.data = {
            "success" : True,
            "summary" : summarized_data,
            "sentences": sentences
        }

        # except:
            # print("Fail")
            # response.data = {
            #     "success" : False
            # }

        return response

class Text(APIView):
    def post(self, request):
        response = Response()

        try:
            text = request.data["text"]

            clean_data = data_clean.clean(text)
            summarized_data = summarize.summarize(clean_data, 0.4)
            summarized_data = data_clean.fix_punctuation(summarized_data)

            response.data = {
                "success" : True,
                "summary" : summarized_data
            }
        
        except:
            response.data = {
                "success" : False
            }
        
        return response

class Abstractive_Link(APIView):
    def post(self, request):
        text = data_clean.clean(script_extract.get_content(request.data["link"]))
        summarized_data = summarize.summarize_num(text, 5)
        summarized_data = data_clean.fix_punctuation(summarized_data)
        key_points = []

        doc = nlp(summarized_data)
        for sent in doc.sents:
            key_points.append(text_quest_gen.paraphrase_sentence(False, model, tokenizer, sent.text, num_beams=5, num_return_sequences=5))

        response = Response()
        response.data = {
            "summary" : key_points
        }

        return response

class Abstractive_Text(APIView):
    def post(self, request):
        text = data_clean.clean(request.data["text"])

        summarized_data = summarize.summarize_num(text, 5)
        summarized_data = data_clean.fix_punctuation(summarized_data)
        key_points = []

        doc = nlp(summarized_data)
        for sent in doc.sents:
            key_points.append(text_quest_gen.paraphrase_sentence(False, model, tokenizer, sent.text, num_beams=5, num_return_sequences=5))

        response = Response()
        response.data = {
            "summary" : key_points
        }

        return response
    