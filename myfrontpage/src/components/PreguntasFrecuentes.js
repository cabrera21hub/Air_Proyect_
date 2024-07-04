import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../components/styles/PreguntasFrecuentes.css'; // Importa el archivo CSS

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/preguntas');
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error al obtener preguntas:', error);
      }
    };

    fetchPreguntas();
  }, []);

  return (
    <div className="faq-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" className="faq-title">Preguntas Frecuentes</Typography>
          {preguntas.map((pregunta) => (
            <Accordion key={pregunta._id} className="faq-accordion">
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className="faq-summary">
                <Typography className="faq-question">{pregunta.pregunta}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="faq-answer">{pregunta.respuesta}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item xs={12} md={6} className="additional-info">
          <Box className="info-box">
            <Typography variant="h5" className="info-title">Más Información sobre la Calidad del Aire</Typography>
            <Typography className="info-text">
              La calidad del aire se refiere a la cantidad y tipos de contaminantes en el aire que respiramos. Estos contaminantes pueden ser dañinos para la salud humana y el medio ambiente.
            </Typography>
            <img src="https://aire.org.mx/wp-content/uploads/2019/10/01-e1574876451855.jpg" alt="Calidad del aire" className="info-image" />
            <Typography className="info-text">
              La contaminación del aire puede provenir de diversas fuentes, como vehículos, fábricas, incendios forestales y procesos industriales. Es importante tomar medidas para reducir nuestra exposición a estos contaminantes y mejorar la calidad del aire.
            </Typography>
            <img src="https://www.gestiopolis.com/wp-content/uploads/2008/07/12004131706_2c0f366685_b.jpg" alt="Medición de la calidad del aire" className="info-image" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreguntasFrecuentes;
