import { useState } from "react"; // Import useState hook to manage component state
import axios from "axios"; // Import axios to make HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

export default function Register() {
  // useState hooks to manage the form fields (username, password, and role)
  const [username, setUsername] = useState(""); // Store the username input
  const [password, setPassword] = useState(""); // Store the password input
  const [role, setRole] = useState("user"); // Default role is set to 'user'
  const navigate = useNavigate(); // useNavigate hook for redirecting after registration

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (prevents page reload)
    try {
      // Send a POST request to register a new user with username, password, and role
      await axios.post("http://localhost:5000/register", {
        username,
        password,
        role,
      });
      alert("Registration successful! You can now login."); // Notify the user of successful registration
      navigate("/login"); // Redirect the user to the login page after successful registration
    } catch (error) {
      console.error("Registration failed", error); // Log any error if registration fails
      alert("Registration failed"); // Notify the user that registration failed
    }
  };

  // JSX for rendering the registration form
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      {/* Center form vertically and horizontally */}
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        {" "}
        {/* Form container and styling */}
        <h2 className="text-2xl mb-4">Register</h2> {/* Form title */}
        {/* Input field for username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-4" // Styling for the input field
          value={username} // Controlled input field tied to the 'username' state
          onChange={(e) => setUsername(e.target.value)} // Update 'username' state when input changes
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4" // Styling for the input field
          value={password} // Controlled input field tied to the 'password' state
          onChange={(e) => setPassword(e.target.value)} // Update 'password' state when input changes
        />
        {/* Dropdown select for role */}
        <select
          className="w-full p-2 border mb-4" // Styling for the select dropdown
          value={role} // Controlled select field tied to the 'role' state
          onChange={(e) => setRole(e.target.value)} // Update 'role' state when selection changes
        >
          <option value="user">User</option>{" "}
          {/* Default option for normal users */}
          <option value="admin">Admin</option> {/* Option for admin users */}
        </select>
        {/* Submit button */}
        <button className="w-full bg-blue-600 text-white p-2">
          Register
        </button>{" "}
        {/* Button styling */}
      </form>
    </div>
  );
}
