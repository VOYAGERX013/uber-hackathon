from django.db import models
from base.models import User

class Email(models.Model):
    email = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_email')
    article_title = models.CharField(max_length=250, blank=True)
    article_link = models.CharField(max_length=250)
    article_img = models.CharField(max_length=250, blank=True)
    