import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, role, handleLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl">Tenant Management</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {isLoggedIn && role === 'admin' && (
            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
