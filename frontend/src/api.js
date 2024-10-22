// src/api.js
import axios from "axios"; // Import axios for making HTTP requests

const API_URL = "http://localhost:5000"; // Base URL for the Flask API

// Function to fetch all tenants from the API
export const fetchTenants = async () => {
  const response = await axios.get(`${API_URL}/tenants`); // Make a GET request to the tenants endpoint
  return response.data; // Return the data received from the response
};

// Function to create a new tenant with provided tenant data
export const createTenant = async (tenantData) => {
  const response = await axios.post(`${API_URL}/tenants`, tenantData); // Make a POST request to create a tenant
  return response.data; // Return the data from the response
};

// Function to update an existing tenant by their ID
export const updateTenant = async (id, tenantData) => {
  const response = await axios.put(`${API_URL}/tenants/${id}`, tenantData); // Make a PUT request to update the tenant
  return response.data; // Return the updated data from the response
};

// Function to delete a tenant by their ID
export const deleteTenant = async (id) => {
  const response = await axios.delete(`${API_URL}/tenants/${id}`); // Make a DELETE request to remove the tenant
  return response.data; // Return the response data confirming deletion
};

// Repeat similarly for Landlords and Properties
