from django.urls import path
from . import views

urlpatterns = [
    path("add-interest/", views.New_Interest.as_view(), name="new_interest"),
    path("suggest-content/", views.Get_Content.as_view(), name="get_content"),
    path("suggest-definition/", views.Get_Definition.as_view(), name="get_definition")
]