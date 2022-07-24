from content_suggestion.modules.suggest_articles import suggest
from emails.models import Email
from base.models import User

def append(email):
    output_suggestions = suggest(email, 10)
    article_titles = output_suggestions["titles"]
    article_links = output_suggestions["links"]

    user = User.objects.get(email=email)

    for article in range(0, len(article_links) - 1):
        new_email_content = Email(email=user, article_link = article_links[article], article_title=article_titles[article])
        new_email_content.save()

