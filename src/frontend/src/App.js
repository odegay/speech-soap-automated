import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import SoapForm from './components/SoapForm';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = (user, pass) => {
    if (user === 'clinician' && pass === 'password') {
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage onLogin={handleLogin} isAuthenticated={authenticated} />}
      />
      <Route
        path="/dashboard"
        element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/soap"
        element={authenticated ? <SoapForm /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={authenticated ? '/dashboard' : '/login'} />}
      />
    </Routes>
  );
}
