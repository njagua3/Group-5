// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update with your Flask API URL

export const fetchTenants = async () => {
  const response = await axios.get(`${API_URL}/tenants`);
  return response.data;
};

export const createTenant = async (tenantData) => {
  const response = await axios.post(`${API_URL}/tenants`, tenantData);
  return response.data;
};

export const updateTenant = async (id, tenantData) => {
  const response = await axios.put(`${API_URL}/tenants/${id}`, tenantData);
  return response.data;
};

export const deleteTenant = async (id) => {
  const response = await axios.delete(`${API_URL}/tenants/${id}`);
  return response.data;
};

// Repeat similarly for Landlords and Properties
