import React, { useState, useEffect } from 'react';
import PhraseBank from './PhraseBank';

export default function SoapForm({ section }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [options, setOptions] = useState({});
  const [phrases, setPhrases] = useState({});
  const [generated, setGenerated] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});

  // Load form configuration
  useEffect(() => {
    fetch(`/api/config/${section}`)
      .then((r) => r.json())
      .then((data) => {
        // Sort fields by order if specified
        const sortedFields = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
        setFields(sortedFields);
        const init = {};
        const collapsed = {};
        sortedFields.forEach((f) => {
          init[f.id] = f.type === 'multi' ? [] : '';
          // Initialize collapsed state based on collapsible property
          if (f.collapsible) {
            collapsed[f.id] = true;
          }
        });
        setValues(init);
        setCollapsedSections(collapsed);
      });
  }, [section]);

  // Load options for fields
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

  // Load phrasebanks for text fields
  useEffect(() => {
    const textFields = fields.filter(f => f.type === 'text');
    textFields.forEach(field => {
      if (!phrases[field.id]) {
        fetch(`/api/phrasebank/${field.id}`)
          .then((r) => r.json())
          .then((data) => {
            const phrasesArray = Array.isArray(data) ? data : [];
            setPhrases(prev => ({ ...prev, [field.id]: phrasesArray }));
          })
          .catch(() => setPhrases(prev => ({ ...prev, [field.id]: [] })));
      }
    });
  }, [fields]);

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

  const toggleCollapse = (id) => {
    setCollapsedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
    const isCollapsed = f.collapsible && collapsedSections[f.id];
    const fieldContent = (
      <>
        {f.type === 'multi' && (
          <fieldset className="mb-3">
            <legend className="h6">{f.label}</legend>
            {(options[f.options] || []).map((o) => (
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
        )}
        {f.type === 'single' && (
          <div className="mb-3">
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
                {(options[f.options] || []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {f.type === 'input' && (
          <div className="mb-3">
            <label className="form-label">
              {f.label}
              <input
                type="text"
                className="form-control"
                value={values[f.id] || ''}
                onChange={(e) => handleChange(f.id, e.target.value)}
                placeholder={f.placeholder || ''}
              />
            </label>
          </div>
        )}
        {f.type === 'text' && (
          <div className="mb-3">
            <label className="form-label">{f.label}</label>
            <PhraseBank phrases={Array.isArray(phrases[f.id]) ? phrases[f.id] : []} onInsert={(p) => insertPhrase(f.id, p)} />
            <textarea
              className="form-control mt-2"
              value={values[f.id] || ''}
              onChange={(e) => handleChange(f.id, e.target.value)}
              rows={3}
            />
          </div>
        )}
      </>
    );

    if (f.collapsible) {
      return (
        <div key={f.id} className="mb-3 border rounded p-2">
          <div 
            className="d-flex justify-content-between align-items-center cursor-pointer"
            onClick={() => toggleCollapse(f.id)}
            style={{ cursor: 'pointer' }}
          >
            <h6 className="mb-0">{f.label}</h6>
            <button 
              className="btn btn-sm btn-link"
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse(f.id);
              }}
            >
              {isCollapsed ? '▼' : '▲'}
            </button>
          </div>
          {!isCollapsed && fieldContent}
        </div>
      );
    }

    return (
      <div key={f.id}>
        {fieldContent}
      </div>
    );
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
