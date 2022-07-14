import nltk
nltk.download("punkt")

from newspaper import Article
import spacy

nlp = spacy.load("en_core_web_sm")

def get_content(url):
  article = Article(url, language="en")
  article.download()
  article.parse()
  article.nlp()

  return article.text

def get_title(url):
  article = Article(url, language="en")
  article.download()
  article.parse()
  article.nlp()

  return article.title

def get_freqs(corpus, chunks):
  freqs = []
  for chunk in chunks:
    freqs.append([chunk, corpus.count(chunk)])

def get_keywords(url):
  article_content = nlp(get_content(url).replace("\n", ""))

  noun_chunks = []

  for chunk in article_content.noun_chunks:
    noun_chunks.append(chunk.text)

  article = Article(url, language="en")
  article.download()
  article.parse()
  article.nlp()

  return article.keywords