from django.urls import path
from . import views

urlpatterns = [
    path("link/", views.Link.as_view(), name="link"),
    path("text/", views.Text.as_view(), name="text"),
    path("abstractive-link/", views.Abstractive_Link.as_view(), name="abstractive_link"),
    path("abstractive-text/", views.Abstractive_Text.as_view(), name="abstractive_text")
]