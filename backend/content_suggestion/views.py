from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Interest
from base.models import User
from .modules import suggest_articles
from emails.models import Email
from datetime import datetime
import wikipedia
from questgen.modules import script_extract

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

class Append_to_db(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]

        output_suggestions = suggest_articles.suggest(email, 10)
        article_titles = output_suggestions.titles
        article_links = output_suggestions.links

        user = User.objects.get(email=email)

        for article in range(0, len(article_links) - 1):
            new_email_content = Email(email=user, article_link = article_links[article], article_title=article_titles[article])
            new_email_content.save()

        response.data = {
            "success" : True
        }

        return response

class Fetch_Suggestions(APIView):
    def post(self, request):
        response = Response()
        email = request.data["email"]
        user = User.objects.get(email=email)
        user_suggestions = Email.objects.filter(email=user)

        format_suggestions = []

        for suggestion in user_suggestions:
            format_suggestions.append({
                "title" : suggestion.article_title,
                "link" : suggestion.article_link,
                "subtitle" : script_extract.get_content(suggestion.article_link)[0:100]
            })

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

class Begin_Loop(APIView):
    def post(self, request):
        response = Response()
        all_interests = Interest.objects.all()
        
        for interest in all_interests:
            main_article_data = suggest_articles.suggest(interest.email, 5)

            article_links = main_article_data.links
            article_titles = main_article_data.titles

            user = User.objects.get(email=interest.email)

            for article in range(0, len(article_links) - 1):
                new_email_content = Email(email=user, article_link = article_links[article], article_title=article_titles[article])
                new_email_content.save()

        response.data = {
            "success" : True,
            "executed_time" : datetime.now()
        }

        return response
        