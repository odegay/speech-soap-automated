import React, { useState } from 'react';
import PhraseBank from './PhraseBank';

const DISPOSITIONS = ['Engaged', 'Shy', 'Energetic', 'Tired', 'Distracted', 'Cooperative', 'Resistant'];
const ACTIVITIES = ['Blocks', 'Books', 'Puzzles', 'Art', 'Sensory Play', 'Following Directions', 'Card Decks', 'Conversational Play', 'Assessment'];
const SETTINGS = ['Clinic Room', 'Classroom', 'Home', 'Group Setting', 'Individual Session'];
const INTERACTIONS = ['Parallel play', 'Interactive play', 'Structured drill', 'Conversational', 'Assessment protocol'];
const LANGUAGE_MODALITY = ['English', 'Bilingual', 'Gestures', 'AAC'];
const ENGAGEMENT_LEVEL = ['High', 'Moderate', 'Low', 'Variable'];
const COOPERATION_LEVEL = ['High', 'Moderate', 'Low', 'Variable'];
const PRIMARY_FOCUS = ['Expressive Language', 'Receptive Language', 'Articulation', 'Pragmatics', 'Fluency', 'Feeding'];

export default function SoapForm() {
  const [disposition, setDisposition] = useState([]);
  const [activities, setActivities] = useState([]);
  const [setting, setSetting] = useState('');
  const [interaction, setInteraction] = useState([]);
  const [languageModality, setLanguageModality] = useState([]);
  const [engagement, setEngagement] = useState('');
  const [cooperation, setCooperation] = useState('');
  const [focus, setFocus] = useState('');

  const [communication, setCommunication] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [observations, setObservations] = useState('');
  const [transitionNotes, setTransitionNotes] = useState('');

  const [generated, setGenerated] = useState('');
  const [activeField, setActiveField] = useState(null);

  const handleInsert = (phrase) => {
    switch (activeField) {
      case 'communication':
        setCommunication((v) => v + phrase);
        break;
      case 'difficulties':
        setDifficulties((v) => v + phrase);
        break;
      case 'observations':
        setObservations((v) => v + phrase);
        break;
      case 'transitionNotes':
        setTransitionNotes((v) => v + phrase);
        break;
      case 'generated':
        setGenerated((v) => v + phrase);
        break;
      default:
        break;
    }
  };

  const toggleValue = (value, setter, list) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      prompt: `Disposition: ${disposition.join(', ')}\nActivities: ${activities.join(', ')}\nSetting: ${setting}\nInteraction: ${interaction.join(', ')}\nLanguage: ${languageModality.join(', ')}\nEngagement: ${engagement}\nCooperation: ${cooperation}\nFocus: ${focus}\nCommunication: ${communication}\nDifficulties: ${difficulties}\nObservations: ${observations}\nTransition: ${transitionNotes}`,
    };
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
  };

  return (
    <div>
      <h2>SOAP Note Form</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Disposition</legend>
          {DISPOSITIONS.map((d) => (
            <label key={d}>
              <input
                type="checkbox"
                checked={disposition.includes(d)}
                onChange={() => toggleValue(d, setDisposition, disposition)}
              />
              {d}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Activities/Materials</legend>
          {ACTIVITIES.map((a) => (
            <label key={a}>
              <input
                type="checkbox"
                checked={activities.includes(a)}
                onChange={() => toggleValue(a, setActivities, activities)}
              />
              {a}
            </label>
          ))}
        </fieldset>

        <div>
          <label>
            Setting/Context
            <select value={setting} onChange={(e) => setSetting(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {SETTINGS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset>
          <legend>Interaction Style</legend>
          {INTERACTIONS.map((i) => (
            <label key={i}>
              <input
                type="checkbox"
                checked={interaction.includes(i)}
                onChange={() => toggleValue(i, setInteraction, interaction)}
              />
              {i}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Language Modality</legend>
          {LANGUAGE_MODALITY.map((l) => (
            <label key={l}>
              <input
                type="checkbox"
                checked={languageModality.includes(l)}
                onChange={() => toggleValue(l, setLanguageModality, languageModality)}
              />
              {l}
            </label>
          ))}
        </fieldset>

        <div>
          <label>
            Engagement Level
            <select value={engagement} onChange={(e) => setEngagement(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {ENGAGEMENT_LEVEL.map((eLevel) => (
                <option key={eLevel} value={eLevel}>
                  {eLevel}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Cooperation Level
            <select value={cooperation} onChange={(e) => setCooperation(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {COOPERATION_LEVEL.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Primary Focus
            <select value={focus} onChange={(e) => setFocus(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {PRIMARY_FOCUS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Communication Examples
            <textarea
              value={communication}
              onFocus={() => setActiveField('communication')}
              onChange={(e) => setCommunication(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Difficulties/Errors
            <textarea
              value={difficulties}
              onFocus={() => setActiveField('difficulties')}
              onChange={(e) => setDifficulties(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Unique Observations
            <textarea
              value={observations}
              onFocus={() => setActiveField('observations')}
              onChange={(e) => setObservations(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Transition Notes
            <textarea
              value={transitionNotes}
              onFocus={() => setActiveField('transitionNotes')}
              onChange={(e) => setTransitionNotes(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Generate Note</button>
      </form>

      <h3>Generated Note</h3>
      <textarea
        value={generated}
        onFocus={() => setActiveField('generated')}
        onChange={(e) => setGenerated(e.target.value)}
        rows={6}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: '0.5rem' }}>
        <button type="button" onClick={saveText}>
          Save as Text
        </button>
      </div>

      <h3>Phrase Bank</h3>
      <PhraseBank onInsert={handleInsert} />
    </div>
  );
}
