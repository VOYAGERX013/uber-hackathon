from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt

def home(req):
    return HttpResponse("Hello world!")

class Register(APIView):

    @csrf_exempt
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

class Login(APIView):
    def post(self, request):
        pass