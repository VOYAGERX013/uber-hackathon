from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Interest
from base.models import User

class New_Interest(APIView):
    def post(self, request):
        response = Response()
        try:
            email = request.data["email"]
            interest = request.data["interest"]

            print(email)
            print(interest)

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

