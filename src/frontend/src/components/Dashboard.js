import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <Link to="/soap">
          <button type="button">New SOAP Note</button>
        </Link>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <em>Future features will appear here.</em>
      </div>
    </div>
  );
}
