from django.db import models
from base.models import User

class Interest(models.Model):
    email = models.ForeignKey(User, on_delete=models.CASCADE)
    interest = models.CharField(max_length=30)
