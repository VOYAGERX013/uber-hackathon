from django.urls import path
from . import views

urlpatterns = [
    path("add-interest/", views.New_Interest.as_view(), name="new_interest"),
    path("suggest-definition/", views.Get_Definition.as_view(), name="get_definition"),
    path("begin-loop/", views.Begin_Loop.as_view(), name="begin_loop"),
    path("fetch-suggestions/", views.Fetch_Suggestions.as_view(), name="fetch_suggestions"),
    path("suggest-interests/", views.Suggest_Interests.as_view(), name="suggest_interests")
]