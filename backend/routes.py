from flask import request, jsonify, abort
from flask_restful import Resource, Api
from db_config import db
from models import Tenant, Landlord, Property
from app import app 

# Initialize Flask-RESTful Api
api = Api(app)

# Helper function to get an object or return 404
def get_object_or_404(model, object_id):
    obj = model.query.get(object_id)
    if obj is None:
        abort(404, description=f"{model.__name__} with id {object_id} not found")
    return obj

# Tenant Resource
class TenantResource(Resource):
    def get(self, id=None):
        if id:
            tenant = get_object_or_404(Tenant, id)
            return jsonify(tenant.to_dict())
        tenants = Tenant.query.all()
        return jsonify([tenant.to_dict() for tenant in tenants])

    def post(self):
        data = request.get_json()
        tenant = Tenant(**data)
        db.session.add(tenant)
        db.session.commit()
        return jsonify(tenant.to_dict()), 201

    def put(self, id):
        tenant = get_object_or_404(Tenant, id)
        data = request.get_json()
        for key, value in data.items():
            setattr(tenant, key, value)
        db.session.commit()
        return jsonify(tenant.to_dict())

    def delete(self, id):
        tenant = get_object_or_404(Tenant, id)
        db.session.delete(tenant)
        db.session.commit()
        return jsonify({"message": f"Tenant {id} deleted successfully"}), 200

# Landlord Resource
class LandlordResource(Resource):
    def get(self, id=None):
        if id:
            landlord = get_object_or_404(Landlord, id)
            return jsonify(landlord.to_dict())
        landlords = Landlord.query.all()
        return jsonify([landlord.to_dict() for landlord in landlords])

    def post(self):
        data = request.get_json()
        landlord = Landlord(**data)
        db.session.add(landlord)
        db.session.commit()
        return jsonify(landlord.to_dict()), 201

    def put(self, id):
        landlord = get_object_or_404(Landlord, id)
        data = request.get_json()
        for key, value in data.items():
            setattr(landlord, key, value)
        db.session.commit()
        return jsonify(landlord.to_dict())

    def delete(self, id):
        landlord = get_object_or_404(Landlord, id)
        db.session.delete(landlord)
        db.session.commit()
        return jsonify({"message": f"Landlord {id} deleted successfully"}), 200

# Property Resource
class PropertyResource(Resource):
    def get(self, id=None):
        if id:
            property = get_object_or_404(Property, id)
            return jsonify(property.to_dict())
        properties = Property.query.all()
        return jsonify([property.to_dict() for property in properties])

    def post(self):
        data = request.get_json()
        property = Property(**data)
        db.session.add(property)
        db.session.commit()
        return jsonify(property.to_dict()), 201

    def put(self, id):
        property = get_object_or_404(Property, id)
        data = request.get_json()
        for key, value in data.items():
            setattr(property, key, value)
        db.session.commit()
        return jsonify(property.to_dict())

    def delete(self, id):
        property = get_object_or_404(Property, id)
        db.session.delete(property)
        db.session.commit()
        return jsonify({"message": f"Property {id} deleted successfully"}), 200

# Define routes for the API resources
api.add_resource(TenantResource, '/tenants', '/tenants/<int:id>')
api.add_resource(LandlordResource, '/landlords', '/landlords/<int:id>')
api.add_resource(PropertyResource, '/properties', '/properties/<int:id>')
