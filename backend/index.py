from dataclasses import dataclass
from flask import Flask, jsonify,  request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/proyecto_financetech'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

@dataclass
class User(db.Model):
    id: int
    username: str
    email: str
    password: str
    status: str

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20))
    transactions = db.relationship('Transaction', backref='user', lazy=True)
    friends1 = db.relationship('Friend', foreign_keys='Friend.user1_id', backref='user1', lazy=True)
    friends2 = db.relationship('Friend', foreign_keys='Friend.user2_id', backref='user2', lazy=True)
    
    def __repr__(self):
        return f'<User {self.username}>'
    
    def check_password(self, password):
        return self.password == password
    
@dataclass
class Transaction(db.Model):
    id: int
    user_id: int
    type: str
    category: str
    amount: float
    date: str
    status: str

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20))

    def __repr__(self):
        return f'<Transaction {self.id}>'

@dataclass
class Friend(db.Model):
    id: int
    user1_id: int
    user2_id: int
    user1_accepted: bool
    user2_accepted: bool
    status: str

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user1_accepted = db.Column(db.Boolean, nullable=False)
    user2_accepted = db.Column(db.Boolean, nullable=False)
    status = db.Column(db.String(20))

    def __repr__(self):
        return f'<Friend {self.id}>'

with app.app_context():
    db.create_all()



#APIs

@app.route('/users',methods=['GET','POST'])
def route_users():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)
    elif request.method == 'POST':
        data = request.get_json()
        user = User(username=data['username'],email=data['email'],password=data['password'])
        db.session.add(user)
        db.session.commit()
        return 'SUCCESS'

@app.route('/users/<user_id>', methods=['GET','PUT','DELETE'])
def route_users_id(user_id):
    if request.method == 'GET':
        user = User.query.filter_by(id=user_id).first()
        return jsonify(user)
    elif request.method == 'PUT':
        data = request.get_json()
        user = User.query.filter_by(id=user_id).first()
        user.username = data['username']
        user.email = data['email']
        user.password = data['password']
        db.session.commit()
        db.session.refresh(user)
        return 'SUCCESS'
    elif request.method == 'DELETE':
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return 'SUCCESS'



@app.route('/transactions',methods=['GET','POST'])
def route_transactions():
    if request.method == 'GET':
        transactions = Transaction.query.all()
        return jsonify(transactions)
    elif request.method == 'POST':
        data = request.get_json()
        transaction = Transaction(user_id=data['user_id'],type=data['type'],category=data['category'],amount=data['amount'],date=data['date'])
        db.session.add(transaction)
        db.session.commit()
        return 'SUCCESS'

@app.route('/transactions/<transaction_id>', methods=['GET','PUT','DELETE'])
def route_transactions_id(transaction_id):
    if request.method == 'GET':
        transaction = Transaction.query.filter_by(id=transaction_id).first()
        return jsonify(transaction)
    elif request.method == 'PUT':
        data = request.get_json()
        transaction = Transaction.query.filter_by(id=transaction_id).first()
        transaction.user_id = data['user_id']
        transaction.type = data['type']
        transaction.category = data['category']
        transaction.amount = data['amount']
        transaction.date = data['date']
        db.session.commit()
        db.session.refresh(transaction)
        return 'SUCCESS'
    elif request.method == 'DELETE':
        transaction = Transaction.query.get_or_404(transaction_id)
        db.session.delete(transaction)
        db.session.commit()
        return 'SUCCESS'
    


@app.route('/friends',methods=['GET','POST'])
def route_friends():
    if request.method == 'GET':
        friends = Friend.query.all()
        return jsonify(friends)
    elif request.method == 'POST':
        data = request.get_json()
        friend = Friend(user1_id=data['user1_id'],user2_id=data['user2_id'],user1_accepted=data['user1_accepted'],user2_accepted=data['user2_accepted'])
        db.session.add(friend)
        db.session.commit()
        return 'SUCCESS'

@app.route('/friends/<friend_id>', methods=['GET','PUT','DELETE'])
def route_friends_id(friend_id):
    if request.method == 'GET':
        friend = Friend.query.filter_by(id=friend_id).first()
        return jsonify(friend)
    elif request.method == 'PUT':
        data = request.get_json()
        friend = Friend.query.filter_by(id=friend_id).first()
        friend.user1_id = data['user1_id']
        friend.user2_id = data['user2_id']
        friend.user1_accepted = data['user1_accepted']
        friend.user2_accepted = data['user2_accepted']
        db.session.commit()
        db.session.refresh(friend)
        return 'SUCCESS'
    elif request.method == 'DELETE':
        friend = Friend.query.get_or_404(friend_id)
        db.session.delete(friend)
        db.session.commit()
        return 'SUCCESS'