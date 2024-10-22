// Import Link and useNavigate from react-router-dom for navigation
import { Link, useNavigate } from "react-router-dom";

// Define the Navbar component, which accepts props: isLoggedIn, role, and handleLogout
export default function Navbar({ isLoggedIn, role, handleLogout }) {
  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  return (
    // Navbar container with a blue background and white text
    <nav className="bg-blue-600 p-4 text-white">
      {/* Flex container to space out the title and navigation links */}
      <div className="container mx-auto flex justify-between">
        {/* Application title */}
        <h1 className="text-xl">Tenant Management</h1>

        {/* Navigation links area */}
        <div className="flex space-x-4">
          {/* Link to the homepage */}
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {/* Conditionally show the Admin Dashboard link if the user is logged in and has an admin role */}
          {isLoggedIn && role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Admin Dashboard
            </Link>
          )}

          {/* If the user is logged in, show the Logout button; otherwise, show Login and Register links */}
          {isLoggedIn ? (
            // Logout button that calls handleLogout when clicked
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          ) : (
            <>
              {/* Link to the login page */}
              <Link to="/login" className="hover:underline">
                Login
              </Link>

              {/* Link to the register page */}
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
