import React, { useState } from 'react';

const DEFAULT_PHRASES = [
  'Patient was cooperative throughout the session.',
  'Demonstrated improved expressive language skills.',
  'Needed frequent redirection to maintain attention.',
  'Articulation errors were noted during conversation.',
];

export default function PhraseBank({ onInsert }) {
  const [query, setQuery] = useState('');
  const filtered = DEFAULT_PHRASES.filter((p) =>
    p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
      <input
        type="text"
        placeholder="Search phrases"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {filtered.map((p) => (
          <li key={p}>
            <button type="button" onClick={() => onInsert(p)}>
              {p}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
