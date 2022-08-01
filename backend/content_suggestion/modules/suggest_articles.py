from content_suggestion.models import Interest
from base.models import User
from datetime import datetime
from bs4 import BeautifulSoup
import random
import wikipedia
import urllib
from requests_html import HTMLSession
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from newspaper import Article
from urllib.request import urlopen
import json
import os
from dotenv import load_dotenv

load_dotenv()

nlp = spacy.load("en_core_web_sm")

def get_wiki_url(subject):
    results = wikipedia.search(subject, results=10)
    for result in results:
        try:
            return wikipedia.page(result).url
        except:
            continue

def get_source(url):
    session = HTMLSession()
    response = session.get(url)
    return response

def google_search(query):
    query = urllib.parse.quote_plus(query)
    response = get_source("https://www.google.com/search?q=" + query)

    links = list(response.html.absolute_links)
    google_domains = ('https://www.google.', 
                    'https://google.', 
                    'https://webcache.googleusercontent.', 
                    'http://webcache.googleusercontent.', 
                    'https://policies.google.',
                    'https://support.google.',
                    'https://maps.google.',
                    "https://en.wikipedia.",
                    "https://youtube.com.",
                    "https://www.youtube.com.")

    for url in links[:]:
        if url.startswith(google_domains) or "youtube" in url:
            links.remove(url)
    return links[0:10]

def get_title(url):
    try:
        article = Article(url, language="en")

        article.download()
        article.parse()
        article.nlp()

        return article.title
    except:
        return "Couldn't fetch article title"


def get_content(url):
    article = Article(url, language="en")
    article.download()
    article.parse()

    return article.text

def get_keywords(text):
    doc = nlp(text)
    word_frequencies={}
    for word in doc:
        if word.text.lower() not in list(STOP_WORDS) and "\n" not in word.text.lower():
            if word.text.lower() not in punctuation:
                if word.text not in word_frequencies.keys():
                    word_frequencies[word.text] = 1
                else:
                    word_frequencies[word.text] += 1
    
    words = []

    for key, value in word_frequencies.items():
        if value > 1 and not key.isnumeric():
          words.append(key.lower())
    
    clean_words = []

    for word in words:
      if word not in clean_words:
        clean_words.append(word)
    
    return clean_words

def aggregate_keywords(topic):
    print(topic)
    keywords = []
    for result in google_search(topic):
        if "wikipedia" in result:
            continue
        else:
            try:
                web_keywords = get_keywords(get_content(result))
                print(web_keywords)
                for keyword in web_keywords:
                    if keyword not in keywords:
                        keywords.append(keyword)
            except:
                continue

    return keywords

def get_wikilinks(subject):
    wiki_url = get_wiki_url(subject)
    soup = BeautifulSoup(urlopen(wiki_url), "lxml")
    links_raw = soup.find_all("a", href=True)
    links = []
    for link in links_raw:
        try:
            link.parent["role"]
        except:
            if link.text != "" and "Jump" not in link.text and ("[" and "]") not in link.text and link.text not in links and len(link.text.split(" ")) < 5 and link.parent.name != "cite" and "footer" not in str(link.parent.get("id")) and "interlanguage" not in str(link.parent.get("class")) and "mw-list-item" not in str(link.parent.get("class")) and "mw-hidden-catlinks" not in str(link.parent.parent.parent.get("id")) and link.text != "Edit links":
                try:
                    link.parent.parent.parent.parent.parent.parent.parent.parent["role"]
                except:
                    if "toclevel" in str(link.parent.get("class")):
                        children = link.findChildren("span")
                        for child in children:
                            if "toctext" in child.get("class"):
                                links.append(child.text)
                    else:
                        links.append(link.text)

    for link in range(0, len(links)):
        links[link] = links[link].lower()

    clean_links = []
    for link in links:
        if link not in clean_links:
            clean_links.append(link)
    
    return clean_links


def get_subtopics(user):
    interest_filter = Interest.objects.filter(email=user)
    relevant_subjects = []
    for interest in interest_filter:
        relevant_subjects.append(interest.interest)

    clean_valid_subs = []

    for subject in relevant_subjects:
        clean_links = get_wikilinks(subject)

        keywords = aggregate_keywords(subject)
        print(keywords)

        valid_subs = []
        wiki_text = ["see also", "references", "external links", "further reading", "introduction", "explanatory notes", "glossary"]

        for link in clean_links:
            for keyword in keywords:
                if keyword in link and "wikipedia" not in link and link not in wiki_text:
                    valid_subs.append(link)

        for sub in valid_subs:
            if sub not in clean_valid_subs:
                clean_valid_subs.append(sub)
        
    return clean_valid_subs


def get_relevant_articles(topic, subtopics, count, limit):
    article_links = []
    article_titles = []

    selection_arr = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0]

    if count < 5:
        all_articles = google_search(topic)

        # try:
        counter = 0
        while counter < limit:
            random_article = all_articles[random.randint(0, len(all_articles)) - 1]
            if random_article not in article_links and get_title(random_article).replace(",", " ") not in article_titles:
                article_links.append(random_article.replace(",", " "))
                article_titles.append(get_title(random_article).replace(",", " "))
                counter += 1
            
        return {
            "success" : True,
            "links" : article_links,
            "titles" : article_titles
        }

        # except:
            # return {
            #     "success" : False,
            #     "links" : False,
            #     "titles" : False
            # }
    else:
        # try:
        counter = 0

        while counter < limit:
            random_choice = selection_arr[random.randint(0, len(selection_arr)) - 1]

            if random_choice == 1:
                random_subtopic = subtopics[random.randint(0, len(subtopics)) - 1]
                all_subtopic_articles = google_search(random_subtopic)
                random_article = all_subtopic_articles[random.randint(0, len(all_subtopic_articles)) - 1]
                if random_article not in article_links and get_title(random_article).replace(",", " ") not in article_titles:
                    article_links.append(random_article.replace(",", " "))
                    article_titles.append(get_title(random_article).replace(",", " "))
                    counter += 1
            
            else:
                random_subtopic = subtopics[random.randint(0, len(subtopics)) - 1]
                subtopic_wiki_links = get_wikilinks(random_subtopic)
                keywords = aggregate_keywords(random_subtopic)

                valid_subs = []
                wiki_text = ["see also", "references", "external links", "further reading", "introduction", "explanatory notes", "glossary"]

                clean_valid_subs = []

                for link in subtopic_wiki_links:
                    for keyword in keywords:
                        if keyword in link and "wikipedia" not in link and link not in wiki_text:
                            valid_subs.append(link)

                for sub in valid_subs:
                    if sub not in clean_valid_subs:
                        clean_valid_subs.append(sub)
                
                random_deep_topic = clean_valid_subs[random.randint(0, len(clean_valid_subs)) - 1]
                all_deep_articles = google_search(random_deep_topic)
                random_article = all_deep_articles[random.randint(0, len(all_deep_articles)) - 1]

                if random_article not in article_links and get_title(random_article).replace(",", " ") not in article_titles:
                    article_links.append(random_article.replace(",", " "))
                    article_titles.append(get_title(random_article).replace(",", " "))
                    counter += 1
                        
        return {
            "success" : True,
            "links" : article_links,
            "titles" : article_titles
        }
        # except:
            # return {
            #     "success" : False,
            #     "links" : False,
            #     "titles" : False
            # }


def suggest(email, limit):
    user = User.objects.get(email=email)
    print("Sub Response 1")

    valid_subtopics = get_subtopics(user)
    print("Sub Response 2")
    date_joined = User.objects.filter(email=user)[0].date_joined
    print("Sub Response 3")
    diff_days = datetime.now().replace(tzinfo=None) - date_joined.replace(tzinfo=None)
    print("Sub Response 4")
    print(diff_days)

    interest_filter = Interest.objects.filter(email=user)
    relevant_subjects = []
    print("Sub Response 5")

    for interest in interest_filter:
        relevant_subjects.append(interest.interest)

    print("Sub Response 6")

    relevant_articles = get_relevant_articles(relevant_subjects[0], valid_subtopics, int(diff_days.days), limit)
    print("Sub Response 7")
    return relevant_articles

def suggest_definition(email):
    try:
        user = User.objects.get(email=email)
        valid_subtopics = get_subtopics(user)
        random_subtopic = valid_subtopics[random.randint(0, len(valid_subtopics)) - 1]

        api_key = os.environ["API_KEY"]
        service_url = 'https://kgsearch.googleapis.com/v1/entities:search'
        params = {
            'query': random_subtopic,
            'limit': 10,
            'indent': True,
            'key': api_key,
        }
        url = service_url + '?' + urllib.parse.urlencode(params)
        response = json.loads(urlopen(url).read())

        return {
            "success" : True,
            "definition" : response["itemListElement"][0]["result"]["detailedDescription"]["articleBody"],
            "sub-topic" : random_subtopic
        }
    except:
        return {
            "success" : False
        }
