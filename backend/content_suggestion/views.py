from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Interest
from base.models import User
from .modules import suggest_articles

class New_Interest(APIView):
    def post(self, request):
        response = Response()

        try:
            email = request.data["email"]
            interest = request.data["interest"]

            user = User.objects.get(email=email)

            new_interest = Interest(email=user, interest=interest)
            new_interest.save()

            response.data = {
                "success" : True
            }

        except:
            response.data = {
                "success" : False
            }

        return response

class Get_Content(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]

        output_suggestions = suggest_articles.suggest(email, 10)
        response.data = output_suggestions

        return response

class Get_Definition(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]

        definition_dict = suggest_articles.suggest_definition(email)

        response.data = definition_dict

        return response