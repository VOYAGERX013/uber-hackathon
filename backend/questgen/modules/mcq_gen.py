import nltk
nltk.download('stopwords')
from questgen.modules.mcq_gen_package import main

def generate_mcqs(text):
    payload = {
        "input_text" : text
    }

    qg = main.QGen()
    output = qg.predict_mcq(payload)

    return output

def prune_options(options, extra_options):
    combined_options = options[0:4]
    for extra_option in extra_options:
        if len(combined_options) < 4:
            combined_options.append(extra_option)
        else:
            break
    
    return combined_options
