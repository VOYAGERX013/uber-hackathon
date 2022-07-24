from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.Register.as_view(), name="register"),
    path("append-to-db/", views.Append_to_db.as_view(), name="append_to_db"),
    path("login/", views.Login.as_view(), name="login"),
    path("get-user/", views.GetUser.as_view(), name="get-user"),
    path("logout/", views.Logout.as_view(), name="logout")
]