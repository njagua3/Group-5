import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function Dashboard({ user }) {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [landlordProperties, setLandlordProperties] = useState([]);
  const [landlordTenants, setLandlordTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const propertyResponse = await axios.get('http://localhost:5000/properties');
      const tenantResponse = await axios.get('http://localhost:5000/tenants');
      setProperties(propertyResponse.data);
      setTenants(tenantResponse.data);

      // If the user is a landlord, filter their properties and tenants
      if (user.role === 'landlord') {
        const userProperties = propertyResponse.data.filter(
          (property) => property.landlord_id === user.id
        );
        const userTenants = tenantResponse.data.filter(
          (tenant) => tenant.landlord_id === user.id
        );

        setLandlordProperties(userProperties);
        setLandlordTenants(userTenants);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [fetchData, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl">Welcome, {user.username}!</h1>
      <p>Your role is: {user.role}</p>

      {user.role === 'landlord' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Your Properties</h2>
          <p>Total properties: {landlordProperties.length}</p>
          
          <h2 className="text-2xl font-semibold mt-4">Your Tenants</h2>
          <p>Total tenants: {landlordTenants.length}</p>

          {landlordTenants.length > 0 && (
            <ul className="list-disc pl-6 mt-2">
              {landlordTenants.map((tenant) => (
                <li key={tenant.id} className="py-1">
                  {tenant.tenant_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {user.role === 'admin' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Admin Overview</h2>
          <p>Total properties: {properties.length}</p>
          <p>Total tenants: {tenants.length}</p>
        </div>
      )}
    </div>
  );
}
