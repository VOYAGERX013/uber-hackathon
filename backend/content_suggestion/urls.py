from django.urls import path
from . import views

urlpatterns = [
    path("add-interest/", views.New_Interest.as_view(), name="new_interest")
]