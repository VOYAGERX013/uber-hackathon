from django.urls import path
from . import views
from .modules.dynamic_update import update
from celery.schedules import crontab
from celery.task import periodic_task

urlpatterns = [
    path("add-interest/", views.New_Interest.as_view(), name="new_interest"),
    path("suggest-definition/", views.Get_Definition.as_view(), name="get_definition"),
    path("fetch-suggestions/", views.Fetch_Suggestions.as_view(), name="fetch_suggestions"),
    path("suggest-interests/", views.Suggest_Interests.as_view(), name="suggest_interests"),
    path("instant-update/", views.Instant_Update.as_view(), name="instant_update")
]

@periodic_task(run_every=crontab(minute=0, hour=0))
def run_update():
    update()