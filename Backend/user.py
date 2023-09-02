from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_marshmallow import Marshmallow
from bson.objectid import ObjectId
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app
app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'  #Replace 'mydatabase' with your actual MongoDB database name
mongo = PyMongo(app)
ma = Marshmallow(app)

class User:
     def __init__(self, username):
         self.username = username
         self.lessons = []

class Board:
     def __init__(self, name):
         self.name = name
         self.classes = []

class Class:
     def __init__(self, name, board_id):
         self.name = name
         self.board_id = board_id
         self.streams = []

class Stream:
     def __init__(self, name, class_id):
         self.name = name
         self.class_id = class_id
         self.publishers = []

class Publisher:
     def __init__(self, name, stream_id):
         self.name = name
         self.stream_id = stream_id
         self.books = []

class Book:
     def __init__(self, name, publisher_id):
         self.name = name
         self.publisher_id = publisher_id
         self.lessons = []

class Lesson:
     def __init__(self, title, objective, content, application,
relevance_to_subject, skill_gained, events_problem, career_path,
user_id, book_id):
         self.id = str(ObjectId())  # Generate a new string-based ID
         self.title = title
         self.objective = objective
         self.content = content
         self.application = application
         self.relevance_to_subject = relevance_to_subject
         self.skill_gained = skill_gained
         self.events_problem = events_problem
         self.career_path = career_path
         self.started = False
         self.last_interacted_with = datetime.datetime.utcnow()
         self.user_id = user_id
         self.book_id = book_id
         self.questions = []
         self.completed = False

class Question:
     def __init__(self, question_type, question_level, question_text,
answer_type, options, lesson_id):
         self.id = str(ObjectId())  # Generate a new string-based ID
         self.question_type = question_type
         self.question_level = question_level
         self.question_text = question_text
         self.answer_type = answer_type
         self.options = options
         self.lesson_id = lesson_id

class UserSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'username', 'lessons')

class BoardSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'name', 'classes')

class ClassSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'name', 'board_id', 'streams')

class StreamSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'name', 'class_id', 'publishers')

class PublisherSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'name', 'stream_id', 'books')

class BookSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'name', 'publisher_id', 'lessons')

class LessonSchema(ma.Schema):
     class Meta:
         fields = ('_id', 'title', 'objective', 'content', 'application',
'relevance_to_subject', 'skill_gained', 'events_problem', 'career_path',
'started', 'last_interacted_with', 'user_id', 'book_id', 'questions',
'completed')

user_schema = UserSchema()
board_schema = BoardSchema()
class_schema = ClassSchema()
stream_schema = StreamSchema()
publisher_schema = PublisherSchema()
book_schema = BookSchema()
lesson_schema = LessonSchema()

# Route for adding a lesson
@app.route('/lesson', methods=['POST'])
def add_lesson():
     lesson_data = request.json  # Extract JSON data from the request
     lesson = Lesson(**lesson_data)
     lesson_id = mongo.db.lessons.insert_one(lesson.__dict__).inserted_id
     lesson._id = str(lesson_id)  # Convert ObjectId to string beforereturning to the frontend
     return jsonify(lesson_schema.dump(lesson)), 201

# Route for getting a lesson by ID
@app.route('/lesson/<string:lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
     lesson = mongo.db.lessons.find_one_or_404({'_id':ObjectId(lesson_id)})
     return jsonify(lesson_schema.dump(lesson))

# Route for getting all lessons
@app.route('/lessons', methods=['GET'])
def get_all_lessons():
     lessons = mongo.db.lessons.find()
     return jsonify(lesson_schema.dump(lessons, many=True)), 200

# Route for starting a lesson
@app.route('/lesson/<string:lesson_id>/start', methods=['PUT'])
def start_lesson(lesson_id):
     lesson = mongo.db.lessons.find_one_or_404({'_id':
ObjectId(lesson_id)})
     if lesson['started']:
         return jsonify({'message': 'Lesson already started'}), 400
     lesson['started'] = True
     lesson['last_interacted_with'] = datetime.datetime.utcnow()
     mongo.db.lessons.update_one({'_id': ObjectId(lesson_id)}, {'$set':lesson})
     return jsonify(lesson_schema.dump(lesson)), 200

# Route for resuming the last interacted lesson for a user
@app.route('/lesson/resume', methods=['GET'])
def resume_lesson():
     user_id = request.args.get('user_id')
     lesson = mongo.db.lessons.find_one({'user_id': user_id}, sort=[('last_interacted_with', -1)])
     if lesson is None:
         return jsonify({'message': 'No lessons found for this user or not started yet'}), 404
     return jsonify(lesson_schema.dump(lesson)), 200

# Route for completing a lesson
@app.route('/lesson/<string:lesson_id>/complete', methods=['PUT'])
def complete_lesson(lesson_id):
     lesson = mongo.db.lessons.find_one_or_404({'_id':
ObjectId(lesson_id)})
     if lesson['completed']:
         return jsonify({'message': 'Lesson already completed'}), 400
     lesson['completed'] = True
     mongo.db.lessons.update_one({'_id': ObjectId(lesson_id)}, {'$set':
lesson})
     return jsonify(lesson_schema.dump(lesson)), 200

# Route for getting completed lessons for a user
@app.route('/user/<string:user_id>/completed_lessons', methods=['GET'])
def get_completed_lessons(user_id):
     lessons = mongo.db.lessons.find({'user_id': user_id, 'completed':True})
     return jsonify(lesson_schema.dump(lessons, many=True)), 200






if __name__ == "__main__":
    app.run(debug=True)

