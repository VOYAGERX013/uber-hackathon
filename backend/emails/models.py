from django.db import models
from base.models import User

class Email(models.Model):
    email = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_email')
    article_titles = models.CharField(max_length=250, blank=True)
    article_links = models.CharField(max_length=250)
    article_descs = models.CharField(max_length=205)
    