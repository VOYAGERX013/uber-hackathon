from .modules import script_extract, data_clean, summarize, engine, text_quest_gen
from rest_framework.views import APIView
from rest_framework.response import Response
import spacy
from transformers import *
from goose3 import Goose
import runner

g = Goose()

nlp = spacy.load("en_core_web_sm")

model = PegasusForConditionalGeneration.from_pretrained("tuner007/pegasus_paraphrase")
tokenizer = PegasusTokenizerFast.from_pretrained("tuner007/pegasus_paraphrase")

class Link(APIView):
    def post(self, request):
        link = request.data["link"]

        content = script_extract.get_content(link)
        clean_data = data_clean.clean(content)
        
        summarized_data = summarize.summarize(clean_data, 0.7)
        summarized_data = data_clean.fix_punctuation(summarized_data)

        multiple_questions = runner.questionize(summarized_data, 5)

        response = Response()

        response.data = {
            "success" : True,
            "mcq_data" : multiple_questions
        }

        return response


# class Link(APIView):
#     def post(self, request):
#         link = request.data["link"]

#         content = script_extract.get_content(link)
#         clean_data = data_clean.clean(content)
        
#         summarized_data = summarize.summarize(clean_data, 0.7)
#         summarized_data = data_clean.fix_punctuation(summarized_data)

#         doc = nlp(summarized_data)

#         sent_types = []
#         sents = []

#         for sent in doc.sents:
#             sent_types.append(text_quest_gen.engine(sent.text))
#             sents.append(sent.text)
        
#         questions = []
#         answers = []

#         for sent in range(0, len(sents)):
#             if len(text_quest_gen.remove_empty(questions)) >= 2:
#                 break
#             else:
#                 if sent_types[sent] == "wav":
#                     question_retrieved = text_quest_gen.wav_(sents[sent])
#                     if len(question_retrieved.split(" ")) > 16:
#                         continue

#                     questions.append(question_retrieved)
#                 elif sent_types[sent] == "waa":
#                     question_retrieved = text_quest_gen.waa_(sents[sent])
#                     if len(question_retrieved.split(" ")) > 16:
#                         continue

#                     questions.append(question_retrieved)
            
#                 if questions[-1] == "":
#                     answers.append("")
#                 else:
#                     answers.append(sents[sent])

#         questions = text_quest_gen.remove_empty(questions)
#         answers = text_quest_gen.remove_empty(answers)

#         for idx in range(0, len(questions)):
#             questions[idx] = text_quest_gen.paraphrase_sentence(True, model, tokenizer, questions[idx], num_beams=10, num_return_sequences=10)

#         multiple_questions = runner.questionize(summarized_data, 3)

#         response = Response()

#         response.data = {
#             "success" : True,
#             "short_questions": questions,
#             "short_answers" : answers,
#             "mcq_data" : multiple_questions
#         }

#         return response

class Text(APIView):
    def post(self, request):
        response = Response()
        try:
            text = request.data["text"]
            clean_data = data_clean.clean(text)
            
            summarized_data = summarize.summarize(clean_data, 0.7)
            summarized_data = data_clean.fix_punctuation(summarized_data)

            doc = nlp(summarized_data)

            sent_types = []
            sents = []

            for sent in doc.sents:
                sent_types.append(text_quest_gen.engine(sent.text))
                sents.append(sent.text)
            
            questions = []
            answers = []

            for sent in range(0, len(sents)):
                if len(text_quest_gen.remove_empty(questions)) >= 3:
                    break
                else:
                    if sent_types[sent] == "wav":
                        question_retrieved = text_quest_gen.wav_(sents[sent])
                        if len(question_retrieved.split(" ")) > 16:
                            continue

                        questions.append(question_retrieved)
                    elif sent_types[sent] == "waa":
                        question_retrieved = text_quest_gen.waa_(sents[sent])
                        if len(question_retrieved.split(" ")) > 16:
                            continue

                        questions.append(question_retrieved)
                
                    if questions[-1] == "":
                        answers.append("")
                    else:
                        answers.append(sents[sent])

            questions = text_quest_gen.remove_empty(questions)
            answers = text_quest_gen.remove_empty(answers)

            for idx in range(0, len(questions)):
                questions[idx] = text_quest_gen.paraphrase_sentence(True, model, tokenizer, questions[idx], num_beams=10, num_return_sequences=10)

            multiple_questions = runner.questionize(summarized_data, 3)

            response.data = {
                "success" : True,
                "questions": questions,
                "answers" : answers,
                "mcq_data" : multiple_questions
            }

        except:
            response.data = {
                "success" : False
            }

        return response
            