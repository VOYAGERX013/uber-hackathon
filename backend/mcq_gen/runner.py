from mcq_gen.app.mcq_generation import MCQGenerator

MCQ_Generator = MCQGenerator(True)

def questionize(text, number):
    return MCQGenerator.generate_mcq_questions(text, number)