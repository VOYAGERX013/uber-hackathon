from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Interest
from base.models import User
from .modules import suggest_articles
from questgen.modules import script_extract
from emails.models import Email
import wikipedia
import re

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

class Suggest_Interests(APIView):
    def post(self, request):
        response = Response()
        
        try:
            query = request.data["query"]
            results = wikipedia.search(query)
            fine_results = []
            for result in results:
                if "disambiguation" not in result:
                    fine_results.append(result)
        
            response.data = {
                "success" : True,
                "suggestions" : fine_results[0:5]
            }
        except:
            response.data = {
                "success" : False
            }
        
        return response

class Fetch_Suggestions(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]
        user = User.objects.get(email=email)
        user_suggestions = Email.objects.filter(email=user)
        print(email)
        print(user_suggestions)
        format_suggestions = {
            "titles" : user_suggestions[0].article_titles,
            "links" : user_suggestions[0].article_links,
            "descs" : user_suggestions[0].article_descs
        }

        response.data = {
            "success" : True,
            "suggestions" : format_suggestions
        }

        return response

class Get_Definition(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]

        definition_dict = suggest_articles.suggest_definition(email)
        response.data = definition_dict

        return response

class Instant_Update(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]
        print("Response 1")

        # try:
        main_article_data = suggest_articles.suggest(email, 5)
        print("Response 2")

        article_links = main_article_data["links"]
        article_titles = main_article_data["titles"]
        article_descs = []

        for link in article_links:
            clean_link = link.replace("'", "").replace('"', "")
            try:
                article_descs.append(re.sub(r'(\n)+', '. ', script_extract.get_content(clean_link).replace(',', '')[0:200]) + "...")
            except:
                article_descs.append(clean_link)
            print(article_descs)
        
        print(str(article_descs)[1:len(str(article_descs)) - 1].replace(", ", ","))

        print("Response 3")
        user = User.objects.get(email=email)
        print("Response 4")
        new_email_content = Email(email=user, article_links=str(article_links)[1:len(str(article_links)) - 1].replace(", ", ","), article_titles=str(article_titles)[1:len(str(article_titles)) - 1].replace(", ", ","), article_descs=str(article_descs)[1:len(str(article_descs)) - 1].replace(", ", ","))
        print("Response 5")
        new_email_content.save()
        print("Response 6")

        response.data = {
            "success" : True
        }

        # except:
        # response.data = {
        #     "success" : False
        # }

        return response

