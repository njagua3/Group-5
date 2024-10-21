import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newTenant, setNewTenant] = useState({ tenant_name: '', tenant_phone_number: '', house_number: '' });
  const [newLandlord, setNewLandlord] = useState({ landlord_name: '', phone_number: '', property_name: '' });
  const [newProperty, setNewProperty] = useState({ property_name: '', location: '', types_of_houses: '', is_occupied: false });

  const [editingTenant, setEditingTenant] = useState(null);
  const [editingLandlord, setEditingLandlord] = useState(null);
  const [editingProperty, setEditingProperty] = useState(null);

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

  // CREATE operations
  const handleCreateTenant = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tenants', newTenant);
      setNewTenant({ tenant_name: '', tenant_phone_number: '', house_number: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating tenant', error);
    }
  };

  const handleCreateLandlord = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/landlords', newLandlord);
      setNewLandlord({ landlord_name: '', phone_number: '', property_name: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating landlord', error);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/properties', newProperty);
      setNewProperty({ property_name: '', location: '', types_of_houses: '', is_occupied: false });
      fetchData();
    } catch (error) {
      console.error('Error creating property', error);
    }
  };

  // UPDATE operations
  const handleUpdateTenant = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tenants/${id}`, editingTenant);
      setEditingTenant(null);
      fetchData();
    } catch (error) {
      console.error('Error updating tenant', error);
    }
  };

  const handleUpdateLandlord = async (id) => {
    try {
      await axios.put(`http://localhost:5000/landlords/${id}`, editingLandlord);
      setEditingLandlord(null);
      fetchData();
    } catch (error) {
      console.error('Error updating landlord', error);
    }
  };

  const handleUpdateProperty = async (id) => {
    try {
      await axios.put(`http://localhost:5000/properties/${id}`, editingProperty);
      setEditingProperty(null);
      fetchData();
    } catch (error) {
      console.error('Error updating property', error);
    }
  };

  // DELETE operations
  const handleDeleteTenant = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tenants/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting tenant', error);
    }
  };

  const handleDeleteLandlord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/landlords/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting landlord', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/properties/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting property', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search tenants, landlords, properties..."
          className="border p-3 w-full md:w-3/4 mb-2 md:mb-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white p-3 rounded md:ml-2">
          Search
        </button>
      </div>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Search Results</h2>
          <ul className="list-disc pl-6">
            {searchResults.map((result, index) => (
              <li key={index} className="bg-white p-2 rounded shadow mb-1">
                {JSON.stringify(result)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tenants Management */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Manage Tenants</h2>
        <form onSubmit={handleCreateTenant} className="mb-4 flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Tenant Name"
            value={newTenant.tenant_name}
            onChange={(e) => setNewTenant({ ...newTenant, tenant_name: e.target.value })}
            className="border p-2 m-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={newTenant.tenant_phone_number}
            onChange={(e) => setNewTenant({ ...newTenant, tenant_phone_number: e.target.value })}
            className="border p-2 m-2 flex-grow"
          />
          <input
            type="text"
            placeholder="House Number"
            value={newTenant.house_number}
            onChange={(e) => setNewTenant({ ...newTenant, house_number: e.target.value })}
            className="border p-2 m-2 flex-grow"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-2">
            Add Tenant
          </button>
        </form>
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
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
              <tr key={tenant.id} className="border-b">
                <td className="border px-4 py-2">
                  {editingTenant?.id === tenant.id ? (
                    <input
                      value={editingTenant.tenant_name}
                      onChange={(e) => setEditingTenant({ ...editingTenant, tenant_name: e.target.value })}
                      className="border p-2"
                    />
                  ) : (
                    tenant.tenant_name
                  )}
                </td>
                <td className="border px-4 py-2">{tenant.tenant_phone_number}</td>
                <td className="border px-4 py-2">{tenant.house_number}</td>
                <td className="border px-4 py-2">
                  {editingTenant?.id === tenant.id ? (
                    <button
                    onClick={() => handleUpdateTenant(tenant.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded m-2"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingTenant({ id: tenant.id, tenant_name: tenant.tenant_name })}
                      className="bg-yellow-400 text-white px-4 py-2 rounded m-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTenant(tenant.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded m-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Landlords Management */}
    <div className="mb-8">
      <h2 className="text-3xl mb-4">Manage Landlords</h2>
      <form onSubmit={handleCreateLandlord} className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Landlord Name"
          value={newLandlord.landlord_name}
          onChange={(e) => setNewLandlord({ ...newLandlord, landlord_name: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newLandlord.phone_number}
          onChange={(e) => setNewLandlord({ ...newLandlord, phone_number: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <input
          type="text"
          placeholder="Property Name"
          value={newLandlord.property_name}
          onChange={(e) => setNewLandlord({ ...newLandlord, property_name: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-2">
          Add Landlord
        </button>
      </form>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Property Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {landlords.map((landlord) => (
            <tr key={landlord.id} className="border-b">
              <td className="border px-4 py-2">
                {editingLandlord?.id === landlord.id ? (
                  <input
                    value={editingLandlord.landlord_name}
                    onChange={(e) => setEditingLandlord({ ...editingLandlord, landlord_name: e.target.value })}
                    className="border p-2"
                  />
                ) : (
                  landlord.landlord_name
                )}
              </td>
              <td className="border px-4 py-2">{landlord.phone_number}</td>
              <td className="border px-4 py-2">{landlord.property_name}</td>
              <td className="border px-4 py-2">
                {editingLandlord?.id === landlord.id ? (
                  <button
                    onClick={() => handleUpdateLandlord(landlord.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded m-2"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingLandlord({ id: landlord.id, landlord_name: landlord.landlord_name })}
                      className="bg-yellow-400 text-white px-4 py-2 rounded m-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteLandlord(landlord.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded m-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Properties Management */}
    <div className="mb-8">
      <h2 className="text-3xl mb-4">Manage Properties</h2>
      <form onSubmit={handleCreateProperty} className="mb-4 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Property Name"
          value={newProperty.property_name}
          onChange={(e) => setNewProperty({ ...newProperty, property_name: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <input
          type="text"
          placeholder="Location"
          value={newProperty.location}
          onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <input
          type="text"
          placeholder="Types of Houses"
          value={newProperty.types_of_houses}
          onChange={(e) => setNewProperty({ ...newProperty, types_of_houses: e.target.value })}
          className="border p-2 m-2 flex-grow"
        />
        <label className="m-2 flex-grow">
          <input
            type="checkbox"
            checked={newProperty.is_occupied}
            onChange={(e) => setNewProperty({ ...newProperty, is_occupied: e.target.checked })}
          />
          Is Occupied
        </label>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-2">
          Add Property
        </button>
      </form>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2">Property Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Types of Houses</th>
            <th className="px-4 py-2">Is Occupied</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b">
              <td className="border px-4 py-2">
                {editingProperty?.id === property.id ? (
                  <input
                    value={editingProperty.property_name}
                    onChange={(e) => setEditingProperty({ ...editingProperty, property_name: e.target.value })}
                    className="border p-2"
                  />
                ) : (
                  property.property_name
                )}
              </td>
              <td className="border px-4 py-2">{property.location}</td>
              <td className="border px-4 py-2">{property.types_of_houses}</td>
              <td className="border px-4 py-2">{property.is_occupied ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2 flex">
                {editingProperty?.id === property.id ? (
                  <button
                    onClick={() => handleUpdateProperty(property.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded m-2"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingProperty({ id: property.id, property_name: property.property_name })}
                      className="bg-yellow-400 text-white px-4 py-2 rounded m-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded m-2"
                    >
                      Delete
                    </button>
                  </>
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

