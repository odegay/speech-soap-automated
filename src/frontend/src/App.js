import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import SoapForm from './components/SoapForm';
import VersionInfo from './components/VersionInfo';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/sections')
      .then((r) => r.json())
      .then((data) => setSections(data.filter((s) => s.enabled)))
      .catch(() =>
        setSections([{ code: 'SUBJECTIVE', label: 'Subjective', enabled: true }])
      );
  }, []);

  const handleLogin = (user, pass) => {
    if (user === 'clinician' && pass === 'password') {
      setAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} isAuthenticated={authenticated} />}
        />
        <Route
          path="/dashboard"
          element={authenticated ? <Dashboard sections={sections} /> : <Navigate to="/login" />}
        />
        {sections.map((s) => (
          <Route
            key={s.code}
            path={`/soap/${s.code}`}
            element={authenticated ? <SoapForm section={s.code} /> : <Navigate to="/login" />}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={authenticated ? '/dashboard' : '/login'} />}
        />
      </Routes>
      <div className="position-fixed bottom-0 end-0 p-3">
        <VersionInfo />
      </div>
    </>
  );
}
