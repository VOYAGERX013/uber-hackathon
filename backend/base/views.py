from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import datetime
import jwt
from dotenv import load_dotenv
import os

load_dotenv()

def home(req):
    return HttpResponse("Hello world!")

class Register(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response = Response()
        response.data = {
            "success" : True
        }

        return response

class Login(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed("incorrect credentials")
        
        if not user.check_password(password):
            raise AuthenticationFailed("incorrect credentials")
        
        payload = {
            "id" : user.id,
            "exp" : datetime.datetime.utcnow() + datetime.timedelta(hours=5),
            "iat" : datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, os.environ["SECRET_KEY"], algorithm="HS256")
        response = Response()

        response.set_cookie(key="token", value=token)
        response.data = {
            "success" : True,
            "token" : token
        }
        return response

class GetUser(APIView):
    def get(self, request):
        token = request.COOKIES.get("token")

        if not token:
            raise AuthenticationFailed("unauthenticated")

        try:
            payload = jwt.decode(token, os.environ["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("unauthenticated")

        user = User.objects.filter(id=payload['id']).first()

        if not user:
            raise AuthenticationFailed("unauthenticated")

        serializer = UserSerializer(user)
        
        return Response(serializer.data)
        
class Logout(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie("token")

        response.data = {
            "success" : True
        }

        return response
