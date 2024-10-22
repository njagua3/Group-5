// Import the Navigate component from react-router-dom
import { Navigate } from "react-router-dom";

// Define the ProtectedRoute component that accepts two props: isLoggedIn and children
export default function ProtectedRoute({ isLoggedIn, children }) {
  // If the user is logged in, render the children (the protected content)
  // If not logged in, redirect the user to the login page using the Navigate component
  return isLoggedIn ? children : <Navigate to="/login" />;
}
