from flask import Flask
from config import LocalDevelopmentConfig
from database import db
from models import *
from security import jwt
from flask_cors import CORS

app=None
def create_app():
    app=Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    app.app_context().push()
    return app
app=create_app()


from routes import *
if __name__ == "__main__":
    #db.create_all()
    #db.session.add(User(username="Lalit",password="7004",isadmin="1",village="murup"))
    #db.session.add(User(username="Amit",password="8340",village="murup"))

    #db.session.commit()
    app.run(debug=True)
