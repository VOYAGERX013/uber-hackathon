import spacy
from spacy.tokenizer import Tokenizer
from spacy.util import compile_infix_regex
import inflect
from transformers import *
from . import data_clean
from spacy.lang.en.stop_words import STOP_WORDS

inflect = inflect.engine()
nlp = spacy.load("en_core_web_sm")

# Treat a word with hyphen as a single token
def custom_tokenizer(nlp):
    inf = list(nlp.Defaults.infixes)
    inf.remove(r"(?<=[0-9])[+\-\*^](?=[0-9-])")
    inf = tuple(inf)
    infixes = inf + tuple([r"(?<=[0-9])[+*^](?=[0-9-])", r"(?<=[0-9])-(?=-)"])
    infixes = [x for x in infixes if '-|–|—|--|---|——|~' not in x]
    infix_re = compile_infix_regex(infixes)

    return Tokenizer(nlp.vocab, prefix_search=nlp.tokenizer.prefix_search,
                                suffix_search=nlp.tokenizer.suffix_search,
                                infix_finditer=infix_re.finditer,
                                token_match=nlp.tokenizer.token_match,
                                rules=nlp.Defaults.tokenizer_exceptions)

nlp.tokenizer = custom_tokenizer(nlp)

# Function to paraphrase a given sentence
def paraphrase_sentence(check_best_result, model, tokenizer, sentence, num_return_sequences=5, num_beams=5):
  inputs = tokenizer([sentence], truncation=True, padding="longest", return_tensors="pt")
  outputs = model.generate(
    **inputs,
    num_beams=num_beams,
    num_return_sequences=num_return_sequences,
  )
  sentences = tokenizer.batch_decode(outputs, skip_special_tokens=True)
  print(f"Sentences: {sentences}")
  
  lowest_length_sent = None

  if check_best_result:
    best_result = None
    for i in sentences:
      if i[-1] == "?" and nlp(i[0])[0].pos_ != "AUX":
        best_result = i
        break
    
    return best_result
  else:
    for para_sentence in range(0, len(sentences)):
        current_length = len(sentences[para_sentence])
        if lowest_length_sent is None:
          lowest_length_sent = [current_length, para_sentence]
        else:
          if current_length < lowest_length_sent[0]:
            lowest_length_sent = [current_length, para_sentence]

  return sentences[lowest_length_sent[1]]


def check_in_parenth(doc, pos):
  parenth_boundaries = []
  for token in range(0, len(doc)):
    if doc[token].text == "(":
      parenth_boundaries.append([token])
    if doc[token].text == ")":
      parenth_boundaries[-1].append(token)
  
  for boundary in parenth_boundaries:
    if pos > boundary[0] and pos < boundary[1]:
      return True
  
  return False

def get_noun_chunk(doc, num):
  words_arr = []
  for word in reversed(range(0, int(num))):
    if doc[word].tag_ == "NN" or doc[word].tag_ == "NNS" or doc[word].tag_ == "PRP":
      prep_pos = None
      lower_bound = word-3
      if word-3 < 0:
        lower_bound = 0
      for fine_word in range(lower_bound, word):
        if doc[fine_word].tag_ == "IN":
          prep_pos = fine_word
          break

      if prep_pos is not None:
        noun_lower_bound = prep_pos-3
        if noun_lower_bound < 0:
          noun_lower_bound = 0

        for fine_word in range(noun_lower_bound, prep_pos):
          if doc[fine_word].tag_ == "NN" or doc[fine_word].tag_ == "NNS":
            words_arr = [doc[word_arr].text for word_arr in range(fine_word, word+1)]
            return " ".join(words_arr)
      else:
        for chunk in doc.noun_chunks:
          if doc[word].text in chunk.text:
            words_arr = chunk.text.split(" ")
  
  return " ".join(words_arr)

def check_overlap(text1, text2):
  doc1 = nlp(text1)
  doc2 = nlp(text2)

  for token in doc1:
    if token.text in doc2.text and token.text not in list(STOP_WORDS):
      return True
  
  return False

def engine(sent):
  sent = nlp(sent)
  rough_tags = []
  fine_tags = []

  for token in sent:
    fine_tags.append(token.tag_)
    rough_tags.append(token.pos_)
  
  waa_condition = False
  wav_condition = False
  whn_condition = False

  for num in range(0, len(rough_tags)):
    if rough_tags[num] == "VERB" and not rough_tags[num] == "AUX":
      wav_condition = True
      break
    
    if rough_tags[num] == "AUX":
      upper_bound = num + 4

      if len(fine_tags) < (num + 4):
        upper_bound = len(fine_tags)

      is_wav = False

      for word in range(num+1, upper_bound):
        if fine_tags[word] == "VBD" or fine_tags[word] == "VBN":
          is_wav = True
          break
      
      if is_wav:
        wav_condition = True
        break
      
      elif fine_tags[num+1] == "VBG":
        wav_condition = True
        break

      else:
        waa_condition = True
    
  if wav_condition:
    return "wav"
  elif waa_condition:
    return "waa"
  else:
    return False


def wav_(sentence):
  doc = nlp(sentence)
  rough_tags = []
  fine_tags = []
  for token in doc:
    fine_tags.append(token.tag_)
    rough_tags.append(token.pos_)
  question = ""
  for num in range(0, len(rough_tags)):
    if rough_tags[num] == "VERB" and not rough_tags[num] == "AUX":
      if fine_tags[num] == "VBD" or fine_tags[num] == "VBN":
        question = f"What did {get_noun_chunk(doc, num)} {doc[num].lemma_} ?"
      elif fine_tags[num] == "VBP" or fine_tags[num] == "VBZ":
        prep_pos = None

        for word in range(num+1, len(rough_tags)):
          if doc[word].pos_ == "ADP":
            prep_pos = doc[word]
            if check_in_parenth(doc, word):
              prep_pos = None
            for i in range(word+1, len(rough_tags)):
              if doc[i].tag_ == "WP":
                prep_pos = None
                break
            break
        
        chunk_noun = get_noun_chunk(doc, num)

        does_verb = "do"
        if inflect.plural(doc[num].text) != doc[num].text:
          does_verb = "does"

        if prep_pos is not None:

          question = f"What {does_verb} {chunk_noun} {doc[num].lemma_} {prep_pos} ?"
        else:
          question = f"What {does_verb} {chunk_noun} {doc[num].lemma_} ?"
        break 

    elif rough_tags[num] == "AUX":
      upper_bound = num + 4

      if len(fine_tags) < (num + 4):
        upper_bound = len(fine_tags)

      enter_if = False
      past_verb = None
      past_verb_pos = None

      for word in range(num+1, upper_bound):
        if fine_tags[word] == "VBD" or fine_tags[word] == "VBN":
          enter_if = True
          past_verb = doc[word]
          past_verb_pos = word
          break

      base_verb_idx = None
      for word in range(num+1, len(rough_tags)):
        if (fine_tags[word] == "VB" and doc[word-1].text == "to") or (fine_tags[word] == "VBG" and doc[word-1].text == "for"):
          base_verb_idx = word
          break

      chunk_noun = get_noun_chunk(doc, num)
      if enter_if:
        if base_verb_idx is not None:
          operation_mid = base_verb_idx - past_verb_pos - 1
          text_mid = ""
          if operation_mid != 0:
            for tok in range(past_verb_pos+1, base_verb_idx-1):
              text_mid += doc[tok].text + " "
              
          question = f"What {doc[num]} {chunk_noun} {past_verb} {text_mid} for ?"
          break
        else:
          question = f"What {doc[num]} {chunk_noun} {past_verb} to be ?"
          break
          
      elif fine_tags[num+1] == "VBG":

        base_verb_idx = None

        for word in range(num+2, len(rough_tags)):
          if fine_tags[word] == "VB" or (fine_tags[word] == "VBG" and doc[word-1] == "for"):
            base_verb_idx = word
            break
        if base_verb_idx is None:
          question = f"What {doc[num]} {chunk_noun} doing ?"
        else:
          question = f"What {doc[num]} {chunk_noun} {doc[num+1]} to do ?"

  return data_clean.clean(question)

def waa_(sentence):
  doc = nlp(sentence)
  rough_tags = []
  fine_tags = []
  for token in doc:
    fine_tags.append(token.tag_)
    rough_tags.append(token.pos_)
  
  start_num = 0

  for num in range(0, len(rough_tags)):
    if rough_tags[num] == "AUX" and (fine_tags[num-1] == "PRP" or fine_tags[num-1][0] == "N"):
      start_num = num
      break
  
  start_word = "What"

  chunk_noun = get_noun_chunk(doc, start_num)
  
  upper_bound = start_num + 5

  if (len(doc) < start_num + 5):
    upper_bound = len(doc)

  pos_preposition = None
  for word in range(start_num, upper_bound):
    if doc[word].tag_ == "IN":
      pos_preposition = word
      if check_in_parenth(doc, word):
        pos_preposition = None
      for i in range(word+1, len(rough_tags)):
        if doc[i].tag_ == "WP":
          pos_preposition = None
          break
      break
  
  if len(doc.ents) > 0:
    for ent in doc.ents:
      if chunk_noun == ent.text and ent.label_ == "PERSON":
        start_word = "Who"

  if pos_preposition == None:
    question = f"{start_word} {doc[start_num]} {chunk_noun} ?"
  else:
    adj_pos = doc[pos_preposition - 1].text
    for word in range(0, pos_preposition):
      if doc[word].tag_ == "JJ":
        adj_pos = doc[word].text

    question = f"{start_word} {doc[start_num].text} {chunk_noun} {adj_pos} {doc[pos_preposition].text} ?"
    
  return question

def remove_empty(test_list):
    res = [i for i in test_list if i != ""]
    return res