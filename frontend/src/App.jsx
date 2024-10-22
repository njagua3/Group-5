import { useState } from "react"; // Importing useState hook from React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing components for routing
import Navbar from "./components/Navbar"; // Importing Navbar component
import Login from "./pages/Login"; // Importing Login page
import Register from "./pages/Register"; // Importing Register page
import Dashboard from "./pages/Dashboard"; // Importing Dashboard page
import AdminDashboard from "./pages/AdminDashboard"; // Importing Admin Dashboard page
import ProtectedRoute from "./components/ProtectedRoute"; // Importing ProtectedRoute component for route protection

export default function App() {
  // State to manage authentication status and user information
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });

  // Function to handle user logout
  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null }); // Reset auth state on logout
  };

  return (
    <Router>
      {" "}
      {/* Wraps the entire application in a Router for routing */}
      <Navbar
        isLoggedIn={auth.isLoggedIn} // Passes login status to Navbar
        role={auth.user?.role} // Passes the user's role to Navbar, using optional chaining
        handleLogout={handleLogout} // Passes logout function to Navbar
      />
      <Routes>
        {" "}
        {/* Contains all the route definitions */}
        <Route path="/login" element={<Login setAuth={setAuth} />} />{" "}
        {/* Route for Login page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Route for Register page */}
        <Route
          path="/" // Home route
          element={
            <ProtectedRoute isLoggedIn={auth.isLoggedIn}>
              {" "}
              {/* Protects the Dashboard route */}
              <Dashboard user={auth.user} />{" "}
              {/* Renders Dashboard if logged in */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin" // Admin route
          element={
            <ProtectedRoute
              isLoggedIn={auth.isLoggedIn && auth.user?.role === "admin"}
            >
              {" "}
              {/* Protects Admin route */}
              <AdminDashboard />{" "}
              {/* Renders AdminDashboard if logged in and user is admin */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
