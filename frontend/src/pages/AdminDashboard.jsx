import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newTenant, setNewTenant] = useState({ tenant_name: '', tenant_phone_number: '', house_number: '', email: '', age: '' });
  const [newLandlord, setNewLandlord] = useState({ landlord_name: '', phone_number: '', property_name: '', email: '' });
  const [newProperty, setNewProperty] = useState({ property_name: '', location: '', types_of_houses: '', is_occupied: false, price: '', size: '' });

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
      setNewTenant({ tenant_name: '', tenant_phone_number: '', house_number: '', email: '', age: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating tenant', error);
    }
  };

  const handleCreateLandlord = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/landlords', newLandlord);
      setNewLandlord({ landlord_name: '', phone_number: '', property_name: '', email: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating landlord', error);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/properties', newProperty);
      setNewProperty({ property_name: '', location: '', types_of_houses: '', is_occupied: false, price: '', size: '' });
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
    {/*Tenant management*/}
<div className="mb-8">
  <h2 className="text-3xl mb-4">Manage Tenants</h2>
  <form onSubmit={handleCreateTenant} className="mb-4 flex flex-col md:flex-row flex-grow md:w-auto flex-wrap">
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
    <input
      type="text"
      placeholder="House Type"
      value={newTenant.house_type}
      onChange={(e) => setNewTenant({ ...newTenant, house_type: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="text"
      placeholder="Property Name"
      value={newTenant.property_name}
      onChange={(e) => setNewTenant({ ...newTenant, property_name: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="number"
      placeholder="Deposit Paid"
      value={newTenant.deposit_paid}
      onChange={(e) => setNewTenant({ ...newTenant, deposit_paid: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="date"
      placeholder="Payment Date"
      value={newTenant.payment_date}
      onChange={(e) => setNewTenant({ ...newTenant, payment_date: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="text"
      placeholder="Receipt Number for Deposit"
      value={newTenant.receipt_number_deposit}
      onChange={(e) => setNewTenant({ ...newTenant, receipt_number_deposit: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="number"
      placeholder="Rent Amount"
      value={newTenant.rent_amount}
      onChange={(e) => setNewTenant({ ...newTenant, rent_amount: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="date"
      placeholder="Due Date"
      value={newTenant.due_date}
      onChange={(e) => setNewTenant({ ...newTenant, due_date: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <input
      type="text"
      placeholder="Rent Receipt Number"
      value={newTenant.rent_receipt_number}
      onChange={(e) => setNewTenant({ ...newTenant, rent_receipt_number: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-2">
      Add Tenant
    </button>
  </form>

  <table className="min-w-full table-auto bg-white shadow-md rounded-lg flex-grow md:w-auto table-fixed overflow-x-auto">
    <thead>
      <tr>
        <th className="w-1/6 px-2 py-2">Name</th>
        <th className="w-1/6 px-2 py-2">Phone</th>
        <th className="w-1/12 px-2 py-2">House No.</th>
        <th className="w-1/12 px-2 py-2">Type</th>
        <th className="w-1/6 px-2 py-2">Property</th>
        <th className="w-1/12 px-2 py-2">Deposit</th>
        <th className="w-1/12 px-2 py-2">Pay Date</th>
        <th className="w-1/12 px-2 py-2">Rec. No.</th>
        <th className="w-1/12 px-2 py-2">Rent</th>
        <th className="w-1/12 px-2 py-2">Due Date</th>
        <th className="w-1/12 px-2 py-2">Rent Rec. No.</th>
        <th className="w-1/12 px-2 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tenants.map((tenant) => (
        <tr key={tenant.id} className="border-b">
          <td className="border px-4 py-2">
            {editingTenant?.id === tenant.id ? (
              <input
                value={editingTenant.tenant_name}
                onChange={(e) => setEditingTenant({ ...editingTenant, tenant_name: e.target.value})}
                className="border p-2"
              />
            ) : (
              tenant.tenant_name
            )}
          </td>
          <td className="border px-2 py-2">{tenant.tenant_phone_number}</td>
          <td className="border px-2 py-2">{tenant.house_number}</td>
          <td className="border px-2 py-2">{tenant.house_type}</td>
          <td className="border px-2 py-2">{tenant.property_name}</td>
          <td className="border px-2 py-2">{tenant.deposit_paid}</td>
          <td className="border px-2 py-2">{tenant.payment_date}</td>
          <td className="border px-2 py-2">{tenant.receipt_number_deposit}</td>
          <td className="border px-2 py-2">{tenant.rent_amount}</td>
          <td className="border px-2 py-2">{tenant.due_date}</td>
          <td className="border px-2 py-2">{tenant.rent_receipt_number}</td>
          <td className="border px-2 py-2 flex">
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

{/* Landlord Management*/}
<div className="mb-8">
  <h2 className="text-3xl mb-4">Manage Landlords</h2>
  <form onSubmit={handleCreateLandlord} className="mb-4 flex flex-col md:flex-row flex-grow md:w-auto flex-wrap">
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
      placeholder="Properties Owned"
      value={newLandlord.properties_owned}
      onChange={(e) => setNewLandlord({ ...newLandlord, properties_owned: e.target.value })}
      className="border p-2 m-2 flex-grow"
    />
    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded m-2">
      Add Landlord
    </button>
  </form>

  <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
    <thead>
      <tr>
        <th className="px-4 py-2">Landlord Name</th>
        <th className="px-4 py-2">Phone Number</th>
        <th className="px-4 py-2">Properties Owned</th>
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
          <td className="border px-4 py-2">{landlord.properties_owned}</td>
          <td className="border px-4 py-2 flex">
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
        <form onSubmit={handleCreateProperty} className="mb-4 flex flex-col md:flex-row flex-grow md:w-auto flex-wrap ">
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
          <input
            type="text"
            placeholder="Price"
            value={newProperty.price}
            onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
            className="border p-2 m-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Size"
            value={newProperty.size}
            onChange={(e) => setNewProperty({ ...newProperty, size: e.target.value })}
            className="border p-2 m-2 flex-grow"
          />
          <div className="border p-2 m-2 flex-grow">
            <label>
              Occupied:
              <input
                type="checkbox"
                checked={newProperty.is_occupied}
                onChange={(e) => setNewProperty({ ...newProperty, is_occupied: e.target.checked })}
              />
            </label>
          </div>
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
              <th className="px-4 py-2">Occupied</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="border px-4 py-2">{property.property_name}</td>
                <td className="border px-4 py-2">{property.location}</td>
                <td className="border px-4 py-2">{property.types_of_houses}</td>
                <td className="border px-4 py-2">{property.is_occupied ? 'Yes' : 'No'}</td>
                <td className="border px-4 py-2">{property.price}</td>
                <td className="border px-4 py-2">{property.size}</td>
                <td className="border px-4 py-2 flex">
                  <button onClick={() => setEditingProperty(property)} className="bg-blue-500 text-white px-2 py-1 rounded mr-1">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteProperty(property.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
