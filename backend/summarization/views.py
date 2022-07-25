from questgen.modules import summarize, script_extract, data_clean
from rest_framework.views import APIView
from rest_framework.response import Response
from transformers import PegasusForConditionalGeneration, PegasusTokenizer
import torch

class Link(APIView):
    def post(self, request):
        response = Response()

        try:
            link = request.data["link"]

            content = script_extract.get_content(link)
            clean_data = data_clean.clean(content)
            
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
        tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
        model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")


        text = data_clean.clean(script_extract.get_content(request.data["link"]))

        tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
        summary = model.generate(**tokens)


        response = Response()
        response.data = {
            "summary" : tokenizer.decode(summary[0])
        }

        return response

class Abstractive_Text(APIView):
    def post(self, request):
        tokenizer = PegasusTokenizer.from_pretrained("google/pegasus-xsum")
        model = PegasusForConditionalGeneration.from_pretrained("google/pegasus-xsum")

        text = request.data["text"]

        tokens = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
        summary = model.generate(**tokens)

        tokenizer.decode(summary[0])

            