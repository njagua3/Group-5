import random
from faker import Faker
from db_config import db
from models import Tenant, Landlord, Property
from extensions import bcrypt
from app import app

fake = Faker()

def create_landlords(num_landlords=10):
    landlords = []
    for _ in range(num_landlords):
        landlord = Landlord(
            landlord_name=fake.name(),
            phone_number=fake.phone_number()
        )
        db.session.add(landlord)
        landlords.append(landlord)
    db.session.commit()
    return landlords

def create_properties(landlords, num_properties=20):
    properties = []
    for _ in range(num_properties):
        landlord = random.choice(landlords)
        property = Property(
            property_name=fake.company() + " Apartments",
            location=fake.address(),
            landlord_id=landlord.id,
            house_number=fake.building_number(),
            is_occupied=random.choice([True, False])
        )
        db.session.add(property)
        properties.append(property)
    db.session.commit()
    return properties

def create_tenants(properties, num_tenants=30):
    tenants = []
    for _ in range(num_tenants):
        property = random.choice(properties)
        tenant = Tenant(
            tenant_name=fake.name(),
            tenant_phone_number=fake.phone_number(),
            house_number=property.house_number,
            house_type=random.choice(["1BHK", "2BHK", "3BHK"]),
            property_name=property.property_name,
            deposit_paid=round(random.uniform(500, 2000), 2),
            receipt_number_deposit=fake.uuid4(),
            rent_amount=round(random.uniform(1000, 3000), 2),
            rent_receipt_number=fake.uuid4()
        )
        db.session.add(tenant)
        tenants.append(tenant)
    db.session.commit()
    return tenants

def main():
    with app.app_context():
        print("Creating fake data...")
        
        # Create landlords
        landlords = create_landlords()
        print(f"Created {len(landlords)} landlords.")
        
        # Create properties
        properties = create_properties(landlords)
        print(f"Created {len(properties)} properties.")
        
        # Create tenants
        tenants = create_tenants(properties)
        print(f"Created {len(tenants)} tenants.")
        
        print("Data population complete!")

if __name__ == '__main__':
    main()
