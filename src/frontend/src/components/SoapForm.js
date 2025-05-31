import React, { useState, useEffect } from 'react';
import PhraseBank from './PhraseBank';
import config from '../config';

export default function SoapForm({ section }) {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [options, setOptions] = useState({});
  const [phrases, setPhrases] = useState({});
  const [generated, setGenerated] = useState('');
  const [previousGenerated, setPreviousGenerated] = useState(''); // Store previous text
  const [saveMessage, setSaveMessage] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load form configuration
  useEffect(() => {
    fetch(`${config.api.baseUrl}${config.api.endpoints.config(section)}`)
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
        loadOptions(f);
      }
    });
  }, [fields, options]);

  // Load phrasebanks for text fields
  useEffect(() => {
    const textFields = fields.filter(f => f.type === 'text');
    textFields.forEach(field => {
      if (!phrases[field.id]) {
        loadPhrasebank(field);
      }
    });
  }, [fields]);

  const loadOptions = async (f) => {
    if (f.options) {
      const resp = await fetch(`${config.api.baseUrl}${config.api.endpoints.options(f.options)}`);
      const data = await resp.json();
      setOptions((prev) => ({ ...prev, [f.options]: data }));
    }
  };

  const loadPhrasebank = async (field) => {
    if (field.phrasebank) {
      const resp = await fetch(`${config.api.baseUrl}${config.api.endpoints.phrasebank(field.id)}`);
      const data = await resp.json();
      setPhrases((prev) => ({ ...prev, [field.id]: data }));
    }
  };

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
    setIsLoading(true);
    setPreviousGenerated(generated); // Save current text
    setGenerated(''); // Clear the text field
    
    try {
      const resp = await fetch(`${config.api.baseUrl}${config.api.endpoints.generate}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          schema_version: 'v1',
          inputs: values
        }),
      });
      const data = await resp.json();
      setGenerated(data.text || data.error || '');
    } catch (err) {
      setGenerated('Error generating note');
    } finally {
      setIsLoading(false);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Empty function to handle Enter key press
    }
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
            <div className="phrase-bank-container">
              <PhraseBank phrases={Array.isArray(phrases[f.id]) ? phrases[f.id] : []} onInsert={(p) => insertPhrase(f.id, p)} />
            </div>
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
            className="d-flex align-items-center cursor-pointer"
            onClick={() => toggleCollapse(f.id)}
            style={{ cursor: 'pointer' }}
          >
            <button 
              type="button"
              className="btn btn-sm btn-link p-0 me-2"
              onClick={(e) => {
                e.stopPropagation();
                toggleCollapse(f.id);
              }}
            >
              {isCollapsed ? '▼' : '▲'}
            </button>
            <h6 className="mb-0">{f.label}</h6>
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
      <div className="form-container">
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {fields.map((f) => renderField(f))}
          <button 
            type="submit" 
            className="btn btn-primary mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Generating...
              </>
            ) : (
              'Generate Note'
            )}
          </button>
        </form>
      </div>
      <h3 className="mt-4">Generated Note</h3>
      <div className="position-relative">
        {isLoading && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <textarea
          className="form-control"
          value={generated}
          onChange={(e) => setGenerated(e.target.value)}
          rows={6}
          style={{ opacity: isLoading ? 0.5 : 1 }}
        />
      </div>
      <div className="mt-2">
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={saveText}
          disabled={isLoading || !generated}
        >
          Save as Text
        </button>
        {saveMessage && (
          <span className="ms-2 text-success">{saveMessage}</span>
        )}
      </div>
    </div>
  );
}
