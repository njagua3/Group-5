import { useState, useEffect, useCallback } from "react"; // Import React hooks
import axios from "axios"; // Import axios for making HTTP requests

export default function Dashboard({ user }) {
  // State variables to hold properties, tenants, and their filtered counterparts for landlords
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [landlordProperties, setLandlordProperties] = useState([]);
  const [landlordTenants, setLandlordTenants] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Function to fetch data from API, wrapped in useCallback to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Set loading state to true while fetching data
      const propertyResponse = await axios.get(
        "http://localhost:5000/properties"
      ); // Fetch properties
      const tenantResponse = await axios.get("http://localhost:5000/tenants"); // Fetch tenants
      setProperties(propertyResponse.data); // Store properties data in state
      setTenants(tenantResponse.data); // Store tenants data in state

      // If the user is a landlord, filter the properties and tenants based on the landlord's ID
      if (user.role === "landlord") {
        const userProperties = propertyResponse.data.filter(
          (property) => property.landlord_id === user.id // Filter properties owned by the landlord
        );
        const userTenants = tenantResponse.data.filter(
          (tenant) => tenant.landlord_id === user.id // Filter tenants related to the landlord's properties
        );

        // Set landlord-specific properties and tenants in their respective state variables
        setLandlordProperties(userProperties);
        setLandlordTenants(userTenants);
      }
    } catch (error) {
      console.error("Error fetching data", error); // Log any errors during data fetching
    } finally {
      setLoading(false); // Set loading to false once the data fetching is complete
    }
  }, [user]); // The callback function depends on the 'user' object

  // useEffect to run the fetchData function when the component mounts or when the 'user' changes
  useEffect(() => {
    if (user) {
      fetchData(); // Call fetchData if the user object is present
    }
  }, [fetchData, user]); // Dependencies: 'fetchData' and 'user'

  // Conditional rendering: Show a loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {" "}
      {/* Container with Tailwind CSS classes */}
      <h1 className="text-3xl">Welcome, {user.username}!</h1>{" "}
      {/* Welcome message with the user's username */}
      <p>Your role is: {user.role}</p> {/* Display user's role */}
      {user.role === "landlord" && ( // Show landlord-specific data if the user is a landlord
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Your Properties</h2>
          <p>Total properties: {landlordProperties.length}</p>{" "}
          {/* Display number of properties owned by the landlord */}
          <h2 className="text-2xl font-semibold mt-4">Your Tenants</h2>
          <p>Total tenants: {landlordTenants.length}</p>{" "}
          {/* Display number of tenants the landlord has */}
          {/* Conditionally render a list of landlord's tenants if there are any */}
          {landlordTenants.length > 0 && (
            <ul className="list-disc pl-6 mt-2">
              {" "}
              {/* Unordered list of tenants with styling */}
              {landlordTenants.map(
                (
                  tenant // Loop through landlord's tenants
                ) => (
                  <li key={tenant.id} className="py-1">
                    {" "}
                    {/* Display each tenant's name */}
                    {tenant.tenant_name}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      )}
      {user.role === "admin" && ( // Show admin-specific data if the user is an admin
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Admin Overview</h2>
          <p>Total properties: {properties.length}</p>{" "}
          {/* Display total number of properties */}
          <p>Total tenants: {tenants.length}</p>{" "}
          {/* Display total number of tenants */}
        </div>
      )}
    </div>
  );
}
