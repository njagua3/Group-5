from app import app
from db_config import db
from models import Tenant, Landlord, Property
from flask import request, jsonify

@app.route('/tenants', methods=['GET', 'POST'])
def manage_tenants():
    if request.method == 'POST':
        data = request.get_json()
        tenant = Tenant(**data)
        db.session.add(tenant)
        db.session.commit()
        return jsonify(tenant.to_dict()), 201

    tenants = Tenant.query.all()
    return jsonify([tenant.to_dict() for tenant in tenants])

@app.route('/landlords', methods=['GET', 'POST'])
def manage_landlords():
    if request.method == 'POST':
        data = request.get_json()
        landlord = Landlord(**data)
        db.session.add(landlord)
        db.session.commit()
        return jsonify(landlord.to_dict()), 201

    landlords = Landlord.query.all()
    return jsonify([landlord.to_dict() for landlord in landlords])

@app.route('/properties', methods=['GET', 'POST'])
def manage_properties():
    if request.method == 'POST':
        data = request.get_json()
        property = Property(**data)
        db.session.add(property)
        db.session.commit()
        return jsonify(property.to_dict()), 201

    properties = Property.query.all()
    return jsonify([property.to_dict() for property in properties])
