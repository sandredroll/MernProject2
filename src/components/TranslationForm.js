import React, { useState } from 'react';
import axios from 'axios';
import './translation.css';

const TranslationForm = () => {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate', {
        text,
        targetLanguage
      });
      setResult(response.data.translatedText);
      setError('');
    } catch (error) {
      console.error('Translation error:', error);
      setError('Failed to translate text. Please try again.');
    }
  };

  return (
    <div>
      <h1>Text Translator</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="it">Italian</option>
        <option value="zh">Chinese</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      {result && (
        <div>
          <h3>Translation:</h3>
          <p>{result}</p>
        </div>
      )}
      {error && (
        <div>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationForm;