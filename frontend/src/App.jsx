import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={auth.isLoggedIn}
        role={auth.user?.role}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={auth.isLoggedIn}>
              <Dashboard user={auth.user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoggedIn={auth.isLoggedIn && auth.user?.role === 'admin'}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
