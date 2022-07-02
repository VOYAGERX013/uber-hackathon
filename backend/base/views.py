from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

def home(req):
    return HttpResponse("Hello world!")

def register(req):
    pass

def login(req):
    pass