import React, { useState, useEffect } from 'react';
import '../components/styles/PreguntasFrecuentes.css';

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState('');
  const [nuevaRespuesta, setNuevaRespuesta] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/preguntas')
      .then(response => response.json())
      .then(data => setPreguntas(data))
      .catch(error => console.error('Error al obtener preguntas:', error));
  }, []);

  const handleAgregarPregunta = (event) => {
    event.preventDefault();

    fetch('http://localhost:5001/preguntas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pregunta: nuevaPregunta,
        respuesta: nuevaRespuesta
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`La solicitud falló con el código de estado ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setPreguntas([...preguntas, data]);
      setNuevaPregunta('');
      setNuevaRespuesta('');
      setError(null);
    })
    .catch(error => {
      setError(error.message);
      console.error('Error al agregar la pregunta:', error);
    });
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Preguntas Frecuentes</h2>
      <ul className="faq-list">
        {preguntas.map((pregunta, index) => (
          <li key={index} className="faq-item">
            <strong className="faq-question">{pregunta.pregunta}</strong>
            <p className="faq-answer">{pregunta.respuesta}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAgregarPregunta} className="faq-form">
        <h3 className="form-title">Agregar Nueva Pregunta</h3>
        <div className="form-group">
          <label className="form-label">Pregunta:</label>
          <input
            type="text"
            value={nuevaPregunta}
            onChange={(e) => setNuevaPregunta(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Respuesta:</label>
          <input
            type="text"
            value={nuevaRespuesta}
            onChange={(e) => setNuevaRespuesta(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Agregar Pregunta</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PreguntasFrecuentes;
