from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("register/", views.Register.as_view(), name="register"),
    path("login/", views.Login, name="login"),
]