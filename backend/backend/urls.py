from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("base.urls")),
    path("api/questgen/", include("questgen.urls")),
    path("api/suggestion/", include("content_suggestion.urls"))
]
