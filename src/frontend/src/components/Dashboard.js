import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ sections }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Dashboard</h2>
      <div className="mb-3">
        {sections.map((s) => (
          <Link key={s.code} to={`/soap/${s.code}`} className="btn btn-primary me-2">
            New {s.label} Note
          </Link>
        ))}
      </div>
      <div>
        <em>Future features will appear here.</em>
      </div>
    </div>
  );
}
