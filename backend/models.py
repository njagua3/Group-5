from db_config import db
from extensions import bcrypt
from datetime import datetime

class Tenant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_name = db.Column(db.String(100), nullable=False)
    tenant_phone_number = db.Column(db.String(20), nullable=False)
    house_number = db.Column(db.String(10), nullable=False)
    house_type = db.Column(db.String(50), nullable=False)
    property_name = db.Column(db.String(100), nullable=False)
    deposit_paid = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    receipt_number_deposit = db.Column(db.String(100), nullable=True)
    rent_amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, default=lambda: datetime.utcnow().replace(day=5))
    rent_receipt_number = db.Column(db.String(100), nullable=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Landlord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    landlord_name = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    properties_owned = db.relationship('Property', backref='landlord', lazy=True)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Property(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    property_name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    landlord_id = db.Column(db.Integer, db.ForeignKey('landlord.id'), nullable=False)
    house_number = db.Column(db.String(10), nullable=False)
    is_occupied = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(10), nullable=False, default='user')  # Can be 'admin' or 'user'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
