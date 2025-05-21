import React, { useState, useEffect } from 'react';
import PhraseBank from './PhraseBank';

export default function SoapForm({ section }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [options, setOptions] = useState({});
  const [phrases, setPhrases] = useState([]);
  const [generated, setGenerated] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch(`/api/config/${section}`)
      .then((r) => r.json())
      .then((data) => {
        setFields(data);
        const init = {};
        data.forEach((f) => {
          init[f.id] = f.type === 'multi' ? [] : '';
        });
        setValues(init);
      });

    fetch(`/api/phrasebank/${section}`)
      .then((r) => r.json())
      .then(setPhrases)
      .catch(() => setPhrases([]));
  }, [section]);

  useEffect(() => {
    fields.forEach((f) => {
      if (f.options && !options[f.options]) {
        fetch(`/api/options/${f.options}`)
          .then((r) => r.json())
          .then((data) =>
            setOptions((o) => ({ ...o, [f.options]: data }))
          )
          .catch(() => setOptions((o) => ({ ...o, [f.options]: [] })));
      }
    });
  }, [fields, options]);

  const toggleValue = (id, value) => {
    setValues((vals) => {
      const list = vals[id] || [];
      if (list.includes(value)) {
        return { ...vals, [id]: list.filter((v) => v !== value) };
      }
      return { ...vals, [id]: [...list, value] };
    });
  };

  const handleChange = (id, value) => {
    setValues((v) => ({ ...v, [id]: value }));
  };

  const insertPhrase = (id, phrase) => {
    setValues((v) => ({ ...v, [id]: (v[id] || '') + phrase }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lines = fields.map((f) => {
      const val = values[f.id];
      if (Array.isArray(val)) {
        return `${f.label}: ${val.join(', ')}`;
      }
      return `${f.label}: ${val}`;
    });
    const payload = { prompt: lines.join('\n') };
    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      setGenerated(data.text || data.error || '');
    } catch (err) {
      setGenerated('Error generating note');
    }
  };

  const saveText = () => {
    const blob = new Blob([generated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'soap_note.txt';
    a.click();
    URL.revokeObjectURL(url);
    setSaveMessage('Note saved as text');
    setTimeout(() => setSaveMessage(''), 2000);
  };

  const renderField = (f) => {
    if (f.type === 'multi') {
      const opts = options[f.options] || [];
      return (
        <fieldset key={f.id} className="mb-3">
          <legend className="h6">{f.label}</legend>
          {opts.map((o) => (
            <div className="form-check" key={o}>
              <input
                type="checkbox"
                className="form-check-input"
                checked={(values[f.id] || []).includes(o)}
                onChange={() => toggleValue(f.id, o)}
                id={`${f.id}-${o}`}
              />
              <label className="form-check-label" htmlFor={`${f.id}-${o}`}>
                {o}
              </label>
            </div>
          ))}
        </fieldset>
      );
    }
    if (f.type === 'single') {
      const opts = options[f.options] || [];
      return (
        <div key={f.id} className="mb-3">
          <label className="form-label">
            {f.label}
            <select
              className="form-select"
              value={values[f.id] || ''}
              onChange={(e) => handleChange(f.id, e.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              {opts.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </div>
      );
    }
    if (f.type === 'text') {
      return (
        <div key={f.id} className="mb-3">
          <label className="form-label">
            {f.label}
            <textarea
              className="form-control"
              value={values[f.id] || ''}
              onChange={(e) => handleChange(f.id, e.target.value)}
              rows={3}
            />
          </label>
          <PhraseBank phrases={phrases} onInsert={(p) => insertPhrase(f.id, p)} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{section} SOAP Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((f) => renderField(f))}
        <button type="submit" className="btn btn-primary mt-2">
          Generate Note
        </button>
      </form>
      <h3 className="mt-4">Generated Note</h3>
      <textarea
        className="form-control"
        value={generated}
        onChange={(e) => setGenerated(e.target.value)}
        rows={6}
      />
      <div className="mt-2">
        <button type="button" className="btn btn-secondary" onClick={saveText}>
          Save as Text
        </button>
        {saveMessage && (
          <span className="ms-2 text-success">{saveMessage}</span>
        )}
      </div>
    </div>
  );
}
