from base.models import User
from emails.models import Email
from content_suggestion.models import Interest
from content_suggestion.modules import suggest_articles
from questgen.modules import script_extract

def update():
    all_interests = Interest.objects.all()
    
    for interest in all_interests:
        main_article_data = suggest_articles.suggest(interest.email, 5)

        article_links = main_article_data.links
        article_titles = main_article_data.titles
        article_descs = []

        for link in article_links:
            clean_link = link.replace("'", "").replace('"', "")
            try:
                article_descs.append(f"{script_extract.get_content(clean_link)[0:200]}...")
            except:
                article_descs.append(clean_link)


        user = User.objects.get(email=interest.email)
        
        try:
            new_email_content = Email(email=user, article_links=str(article_links)[1:len(str(article_links)) - 1].replace(", ", ","), article_titles=str(article_titles)[1:len(str(article_titles)) - 1].replace(", ", ","), article_descs=str(article_descs)[1:len(str(article_titles)) - 1].replace(", ", ","))
            new_email_content.save()
        except:
            continue

