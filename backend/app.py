from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from model import predict_sentiment


app = Flask(__name__)
CORS(app)

# DATABASE CONFIG
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -------------------------
# USER TABLE
# -------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# -------------------------
# FEEDBACK TABLE
# -------------------------
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    sentiment = db.Column(db.String(50))

# -------------------------
# TEST ROUTE
# -------------------------
@app.route("/")
def home():
    return "Flask Backend Running ✅"

# -------------------------
# SIGNUP API
# -------------------------
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check empty fields
    if not name or not email or not password:
        return jsonify({"msg": "All fields required"}), 400

    # Check if user exists
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    # Create new user
    new_user = User(
        name=name,
        email=email,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Signup successful"}), 201


# -------------------------
# LOGIN API
# -------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    # Check missing fields
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    # Find user
    user = User.query.filter_by(email=email, password=password).first()

    if user:
        return jsonify({
            "msg": "Login successful",
            "user_id": user.id,
            "name": user.name
        })
    else:
        return jsonify({"msg": "Invalid credentials"}), 401



@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.json

    user_id = data.get("user_id")
    comment = data.get("comment")
    rating = int(data.get("rating"))

    sentiment = predict_sentiment(comment)

    # combine rating logic
    if rating >= 4:
        sentiment = "positive"
    elif rating <= 2:
        sentiment = "negative"

    fb = Feedback(
        user_id=user_id,
        comment=comment,
        rating=rating,
        sentiment=sentiment
    )



    db.session.add(fb)
    db.session.commit()

    return jsonify({
        "msg": "Feedback saved",
        "sentiment": sentiment
    })




# -------------------------
# ADMIN LOGIN API
# -------------------------
@app.route("/admin/login", methods=["POST"])
def admin_login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    # Check fields
    if not username or not password:
        return jsonify({"msg": "Username and password required"}), 400

    # Static admin check
    if username == "admin" and password == "admin123":
        return jsonify({
            "msg": "Admin login successful",
            "admin": True
        })
    else:
        return jsonify({"msg": "Invalid admin credentials"}), 401



# -------------------------
# ADMIN DASHBOARD API
# -------------------------
@app.route("/admin/feedbacks", methods=["GET"])
def get_feedbacks():

    all_feedback = Feedback.query.all()

    data = []
    positive = 0
    negative = 0

    for f in all_feedback:

        # count sentiment
        if f.sentiment == "positive":
            positive += 1
        elif f.sentiment == "negative":
            negative += 1

        data.append({
            "id": f.id,
            "user_id": f.user_id,
            "comment": f.comment,
            "rating": f.rating,
            "sentiment": f.sentiment
        })

    return jsonify({
        "total_feedback": len(data),
        "positive": positive,
        "negative": negative,
        "feedbacks": data
    })



# -------------------------
# RUN APP
# -------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()   # creates database automatically
    app.run(debug=True)
