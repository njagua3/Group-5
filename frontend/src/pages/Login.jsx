import { useState } from "react"; // Import React's useState hook for managing form state
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for programmatic navigation

export default function Login({ setAuth }) {
  // Login component that accepts 'setAuth' to update authentication state
  // useState hooks to manage username and password input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate hook for redirecting users after successful login

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page refresh)

    try {
      // Send a POST request to the login API with the username and password
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      // If the login is successful, update the authentication state
      setAuth({
        isLoggedIn: response.data.isLoggedIn, // Set logged in status from the response
        user: response.data.user, // Set the user information from the response
      });
      // Navigate to the dashboard or home page after successful login
      navigate("/"); // Assuming '/' is the dashboard route
    } catch (error) {
      console.error("Login failed", error); // Log error if login fails
      alert("Invalid username or password"); // Alert the user of invalid credentials
    }
  };

  // JSX for rendering the login form
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      {/* Center form vertically and horizontally */}
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        {" "}
        {/* Form styling and onSubmit event handler */}
        <h2 className="text-2xl mb-4">Login</h2> {/* Heading for the form */}
        {/* Input field for username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-4" // Styling for input
          value={username} // Controlled input with 'username' state
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
        />
        {/* Input field for password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4" // Styling for input
          value={password} // Controlled input with 'password' state
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
        />
        {/* Submit button */}
        <button className="w-full bg-blue-600 text-white p-2">
          Login
        </button>{" "}
        {/* Button styling */}
      </form>
    </div>
  );
}
