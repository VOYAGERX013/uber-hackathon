from django.urls import path
from . import views

urlpatterns = [
    path("link/", views.Link.as_view(), name="link"),
    path("text/", views.Text.as_view(), name="text"),
]