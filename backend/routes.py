from flask import current_app as app,jsonify,request,session
from models import *
from flask_jwt_extended import create_access_token,current_user,jwt_required,get_jwt_identity
from functools import wraps
import google.generativeai as genai
import os

@app.route("/api/login",methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or user.password != password:
        return jsonify({"message": "Wrong username or password"}), 401

    access_token = create_access_token(identity=user.username)
    return jsonify({"access_token": access_token, "username": user.username}),200

from flask import request, jsonify

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"message": "Invalid JSON"}), 400

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        phone = data.get("phone")
        pan = data.get("pan")

        if not all([username, password, email, phone, pan]):
            return jsonify({"message": "All fields are required"}), 400

        # Check if user exists
        user = User.query.filter_by(username=username).first()
        if user:
            return jsonify({"message": "User already exists"}), 409

        # Add user
        new_user = User(username=username, password=password, email=email, phone=phone, pan=pan)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User added successfully"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Internal server error"}), 500


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

@app.route("/api/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    username = get_jwt_identity()  # retrieves the username from token
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "pan": user.pan
    })

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    prompt = f"You are a friendly personal finance assistant helping users manage money and budgeting.\nUser: {user_message}"
    
    try:
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


 