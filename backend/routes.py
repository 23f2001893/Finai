from flask import current_app as app,jsonify,request,abort
from models import *
from flask_jwt_extended import create_access_token,current_user,jwt_required,get_jwt_identity
from functools import wraps
# def role_required(required_role):
#     def role(fn):
#         @wraps(fn)
#         @jwt_required()
#         def decorator(*args,**kwargs):
#             if current_user.role !=required_role:
#                 return jsonify("unauthorised"),403
#             return fn(*args,**kwargs)
#         return decorator
#     return role
@app.route("/api/login",methods=["POST"])
def login():
    username=request.json.get("username",None)
    password=request.json.get("password",None)

    user=User.query.filter_by(username=username).one_or_none()
    if not user or not user.password==password:
        return jsonify("Wrong username or password"),401
    

    access_token=create_access_token(identity=user)
    return jsonify(access_token=access_token,isadmin=user.isadmin)

#@app.route("/who_am_i", methods=["GET"])
#@jwt_required()
#def protected():
    return jsonify(
        id=current_user.id,
        username=current_user.username,
        password=current_user.password,
        village=current_user.village
    )

@app.route('/api/register',methods=['POST'])   
def register():
    username=request.json.get('username',None)
    password=request.json.get('password',None)
    village=request.json.get('village',None)
    user=User.query.filter_by(username=username).first()
    if user:
        return jsonify("user alredy exists"),404
    a=User(username=username,password=password,village=village)     
    db.session.add(a)
    db.session.commit()
    return jsonify("user added successfully"),201
@app.route("/api/dashboard")
@jwt_required()
def dashboard():
    if current_user.isadmin == 1:
        
        subjects=Subject.query.all()
        chapters=Chapter.query.all()
         # Serialize subjects
        subjects_data = [
            {"id": s.id, "name": s.name} for s in subjects
        ]

        # Serialize chapters
        chapters_data = [
            {"id": c.id, "name": c.name, "subject_id": c.subject_id} for c in chapters
        ]
        chapters_by_subject = {}
        for c in chapters:
            chapters_by_subject.setdefault(c.subject_id, []).append({
                "id": c.id,
                "name": c.name
            })
        len_dict = {c.id: len(c.quizs) for c in chapters}

        return jsonify({
            "subjects": subjects_data,
            "chapters": chapters_data,
            "chapters_by_subject": chapters_by_subject,
            "len_dict": len_dict
        })
    else:
        subjects=Subject.query.all()
        subjects_data = [
            {"id": s.id, "name": s.name} for s in subjects
        ]
        quizzes=Quiz.query.order_by(Quiz.date_of_test.asc()).all()
        chapter_dict={q.chapter_id:q.chapter.name for q in quizzes}
        len_dict={q.id:len(q.questions) for q in quizzes}
        return jsonify({
            "subjects_data":subjects_data,
            "chapter_dict":chapter_dict,
            "len_dict":len_dict

        })

 