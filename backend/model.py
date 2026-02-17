from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# -------------------------
# TRAINING DATA (SAMPLE)
# -------------------------
texts = [
    "This app is amazing",
    "Very bad experience",
    "I love this platform",
    "Worst service ever",
    "Good and easy to use",
    "Terrible interface",
    "Excellent performance",
    "Not user friendly",
    "Really helpful and smooth",
    "I hate this app",
    "very bad",
    "very Good"
]

labels = [
    "positive",
    "negative",
    "positive",
    "negative",
    "positive",
    "negative",
    "positive",
    "negative",
    "positive",
    "negative",
    "negative",
    "positive"
]

# -------------------------
# TRAIN MODEL
# -------------------------
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

model = MultinomialNB()
model.fit(X, labels)

# -------------------------
# PREDICTION FUNCTION
# -------------------------
def predict_sentiment(text):
    vec = vectorizer.transform([text])
    return model.predict(vec)[0]
