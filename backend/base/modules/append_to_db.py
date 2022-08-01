from content_suggestion.modules.suggest_articles import suggest
from emails.models import Email
from base.models import User

def append(email):
    output_suggestions = suggest(email, 10)
    article_titles = output_suggestions["titles"]
    article_links = output_suggestions["links"]

    user = User.objects.get(email=email)

    new_email_content = Email(email=user, article_links=str(article_links)[1:len(str(article_links)) - 1].replace(", ", ","), article_titles=str(article_titles)[1:len(str(article_titles)) - 1].replace(", ", ","))
    new_email_content.save()
