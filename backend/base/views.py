from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
from content_suggestion.models import Interest
import datetime
import jwt
from dotenv import load_dotenv
import os
from .modules import append_to_db

load_dotenv()

class Register(APIView): # Class for registering a user when the register route is hit in urls.py

    def post(self, request):
        response = Response()

        # If the user is saved successfully, send a success message, else sent a failure message
        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            find_user = User.objects.get(email=request.data["email"])

            new_interest = Interest(email=find_user, interest=request.data["interest"])
            new_interest.save()

            response.data = {
                "success" : True
            }
            
        except:
            response.data = {
                "success" : False
            }

        return response

class Append_to_db(APIView):
    def post(self, request):
        append_to_db.append(request.data["email"])

            
class Login(APIView): # Class for logging a user when the login in route is hit in urls.py
    def post(self, request):
        response = Response()

        # If the login function works fine, show success message, else show failure message
        try:
            email = request.data["email"] # Get the email from form
            password = request.data["password"] # Get the password from form
    
            user = User.objects.filter(email=email).first() # Get corresponding user record from the database

            # Checking if user exists and correct password is provided in form
            if user is None:
                raise AuthenticationFailed("incorrect credentials")
        
            if not user.check_password(password):
                raise AuthenticationFailed("incorrect credentials")
        
            # Payload for generating jwt token with expiration time of 5 hours
            payload = {
                "id" : user.id,
                "exp" : datetime.datetime.utcnow() + datetime.timedelta(hours=5),
                "iat" : datetime.datetime.utcnow()
            }

            # Encode the payload data using a secret key
            token = jwt.encode(payload, os.environ["SECRET_KEY"], algorithm="HS256")
    
            # Setting cookie with value of the token
            response.set_cookie(key="token", value=token)
            print("Cookie check")
            print(request.COOKIES.get("token"))
            response.data = {
                "success" : True,
                "token" : token
            }
        
        except:
            response.data = {
                "success" : False
            }

        return response
        
class GetUser(APIView): # Class for getting user credentials
    def post(self, request):
        response = Response()
        # Get the token from cookies
        token = request.COOKIES.get("token")

        # Check if token exists and is not expired
        if not token:
            response.data = {
                "success" : False
            }

            return response

        try:
            # Decode the id from the jwt token
            payload = jwt.decode(token, os.environ["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            response.data = {
                "success" : False
            }

            return response

        # Get the user credentials using the id
        user = User.objects.filter(id=payload['id']).first()

        # Check if user exists
        if not user:
            response.data = {
                "success" : False
            }

            return response

        serializer = UserSerializer(user)

        response.data = {
            "success" : True,
            "result" : serializer.data
        }
        
        return response
        
class Logout(APIView): # Class for logging out
    def post(self, request):
        response = Response()

        try:
            # Remove the token to logout the user
            response.delete_cookie("token")

            response.data = {
                "success" : True
            }

        except:
            response.data = {
                "success" : False
            }
        
        return response

