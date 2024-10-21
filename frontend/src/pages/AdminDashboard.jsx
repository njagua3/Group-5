import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Fetch tenants, landlords, and properties data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tenantData = await axios.get('http://localhost:5000/tenants');
      const landlordData = await axios.get('http://localhost:5000/landlords');
      const propertyData = await axios.get('http://localhost:5000/properties');
      setTenants(tenantData.data);
      setLandlords(landlordData.data);
      setProperties(propertyData.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleDeleteTenant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tenants/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting tenant', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tenants, landlords, properties..."
          className="border p-2 w-full mb-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl">Search Results</h2>
          <ul className="list-disc pl-6">
            {searchResults.map((result, index) => (
              <li key={index}>{JSON.stringify(result)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tenants Management */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Tenants</h2>
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">House Number</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant.id}>
                <td className="border px-4 py-2">{tenant.tenant_name}</td>
                <td className="border px-4 py-2">{tenant.tenant_phone_number}</td>
                <td className="border px-4 py-2">{tenant.house_number}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteTenant(tenant.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Landlords Management */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Landlords</h2>
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Property Name</th>
            </tr>
          </thead>
          <tbody>
            {landlords.map((landlord) => (
              <tr key={landlord.id}>
                <td className="border px-4 py-2">{landlord.landlord_name}</td>
                <td className="border px-4 py-2">{landlord.phone_number}</td>
                <td className="border px-4 py-2">{landlord.property_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Properties Management */}
      <div className="mb-6">
        <h2 className="text-2xl mb-2">Properties</h2>
        <table className="min-w-full table-auto bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Types of Houses</th>
              <th className="px-4 py-2">Occupied Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="border px-4 py-2">{property.property_name}</td>
                <td className="border px-4 py-2">{property.location}</td>
                <td className="border px-4 py-2">{property.types_of_houses}</td>
                <td className="border px-4 py-2">
                  {property.is_occupied ? (
                    <span className="text-green-500">Occupied</span>
                  ) : (
                    <span className="text-red-500">Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
