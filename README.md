# Group-5

# Tenant Management System

## Overview

The *Tenant Management System* is a web-based application built with a Flask API backend and a React frontend, styled with Tailwind CSS. It is designed to streamline the management of tenants, landlords, and properties for both admins and regular users. The system provides robust functionality for managing information, performing CRUD (Create, Read, Update, Delete) operations, and offering a user-friendly interface for accessing and managing property data.

## Features

- *User Management*: Admin and regular user roles with different levels of access.
- *Tenant Management*: Manage tenants' details including name, contact information, property details, and payment status.
- *Landlord Management*: Store and manage information about landlords, such as contact details and properties owned.
- *Property Management*: Handle property records, including house types, house numbers, and ownership.
- *CRUD Operations*: Full Create, Read, Update, and Delete functionality for managing tenants, landlords, and properties.
- *Search Functionality*: Search through records to find specific tenants, landlords, or properties.
- *Responsive Design*: Optimized for use across all devices, providing a seamless experience on desktop, tablet, and mobile devices.

## Tech Stack

- *Frontend*: React, Tailwind CSS, React Router, Formik
- *Backend*: Flask, SQLite (or other supported databases)
- *API Communication*: Fetch API for client-server interaction

## Database Models

The project utilizes several models to manage data effectively:

1. *Tenant*: Stores tenant information such as tenant_name, tenant_phone_number, house_number, house_type, property_name, deposit_paid, payment_date, receipt_number_deposit, rent_amount, due_date, and rent_receipt_number.
2. *Landlord*: Contains information about landlords, including landlord_name and associated properties.
3. *Property*: Manages property details, including property_name, house_type, house_number, and the landlord-tenant relationships.

### Relationships
- *One-to-Many*: A landlord can have multiple properties, and a property can have multiple tenants.
- *Many-to-Many*: Tenants and properties are related, where a tenant can rent multiple properties over time, and a property can be rented by multiple tenants. The association table includes user-submittable attributes like rental history and payment details.

## Project Highlights

- *Forms and Validation*: Uses Formik for handling form input and validation, ensuring data integrity and user-friendly error handling.
- *Client-Side Routing*: Three or more client-side routes with React Router for seamless navigation between different sections of the application, such as the dashboard, tenants, and properties.
- *Fetch API*: The frontend communicates with the Flask backend using the Fetch API to retrieve, submit, and update data.

## Setup Instructions

Follow these steps to get the project up and running on your local environment:

### Prerequisites

- Node.js and npm installed on your machine
- Python 3.x and pip installed
- A virtual environment for Python

### Backend Setup (Flask)

1. Clone the repository:
   bash
   git clone https://github.com/silvanos-eric/phase-3-project.git
   cd phase-3-project/backend
   

2. Create a virtual environment and activate it:
   bash
   python3 -m venv venv
   source venv/bin/activate
   

3. Install the required dependencies:
   bash
   pip install -r requirements.txt
   

4. Set up the database:
   bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   

5. Run the Flask server:
   bash
   flask run
   

### Frontend Setup (React)

1. Navigate to the frontend directory:
   bash
   cd ../frontend
   

2. Install dependencies:
   bash
   npm install
   

3. Start the React development server:
   bash
   npm start
   

4. Open your browser and go to http://localhost:3000 to access the application.

## Usage

- *Admin Dashboard*: Accessible by admin users to manage all aspects of tenants, landlords, and properties.
- *Tenant Management*: Allows creating, updating, and deleting tenant records.
- *Landlord Management*: Facilitates adding and managing landlord information.
- *Property Management*: Create, read, and update property details, including rental history.
- *Search Functionality*: Quickly find records of tenants, landlords, and properties using keywords.

## Future Improvements

- *Enhanced Authentication*: Integrating OAuth2 for third-party login options.
- *Automated Notifications*: Reminders for tenants about rent due dates via email or SMS.
- *Analytics Dashboard*: A detailed overview of occupancy rates, rental income, and tenant demographics.

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork the repository.
2. Create a new branch:
   bash
   git checkout -b feature/YourFeatureName
   
3. Make your changes.
4. Commit your changes:
   bash
   git commit -m "Add your commit message here"
   
5. Push to the branch:
   bash
   git push origin feature/YourFeatureName
   
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact *[Your Name]* at [your.email@example.com].

---

Feel free to customize the placeholders with your details. This README includes an overview, features, tech stack, setup instructions, usage details, and more, providing a comprehensive introduction to your project.