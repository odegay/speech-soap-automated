import React, { useState } from 'react';

export default function PhraseBank({ phrases = [], onInsert }) {
  const [query, setQuery] = useState('');
  
  // Ensure phrases is always an array
  const phrasesArray = Array.isArray(phrases) ? phrases : [];
  
  const filtered = phrasesArray.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="border p-2 mt-2">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search phrases"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="list-unstyled">
        {filtered.map((p) => (
          <li key={p} className="mb-1">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onInsert(p)}>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
