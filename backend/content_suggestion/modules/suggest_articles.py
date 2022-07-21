from models import Interest

def suggest(email):
    relevant_interests = Interest.objects.filter(email=email)