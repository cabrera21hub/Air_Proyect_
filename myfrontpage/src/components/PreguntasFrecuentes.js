import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../components/styles/PreguntasFrecuentes.css'; // Importa el archivo CSS

const PreguntasFrecuentes = () => {
  const preguntas = [
    {
      _id: 1,
      pregunta: '¿Qué es la calidad del aire?',
      respuesta: 'La calidad del aire se refiere a la medida en que el aire es limpio o está contaminado. Se evalúa mediante la concentración de contaminantes como el ozono, partículas (PM2.5 y PM10), monóxido de carbono, dióxido de azufre y dióxido de nitrógeno.'
    },
    {
      _id: 2,
      pregunta: '¿Qué es PM2.5?',
      respuesta: 'PM2.5 son partículas microscópicas en el aire con un diámetro de 2.5 micrómetros o menos. Estas partículas pueden penetrar profundamente en los pulmones y entrar en el torrente sanguíneo, lo que puede causar problemas de salud graves.'
    },
    {
      _id: 3,
      pregunta: '¿Cómo afecta la calidad del aire a la salud?',
      respuesta: 'La mala calidad del aire puede causar enfermedades respiratorias, cardiovasculares y otros problemas de salud. Los efectos pueden ser más graves en niños, ancianos y personas con enfermedades preexistentes.'
    },
    {
      _id: 4,
      pregunta: '¿Qué puedo hacer para protegerme de la contaminación del aire?',
      respuesta: 'Para protegerte de la contaminación del aire, evita salir al aire libre cuando los niveles de contaminación sean altos, usa purificadores de aire en interiores y plantas que absorban contaminantes, y mantén las ventanas cerradas.'
    },
    {
      _id: 5,
      pregunta: '¿Cómo se mide la calidad del aire?',
      respuesta: 'La calidad del aire se mide mediante el uso de estaciones de monitoreo que analizan la concentración de varios contaminantes en el aire. Los datos se recopilan y se utilizan para calcular un índice de calidad del aire (ICA).'
    },
    {
      _id: 6,
      pregunta: '¿Qué es el índice de calidad del aire (ICA)?',
      respuesta: 'El índice de calidad del aire (ICA) es una herramienta que traduce los datos de varios contaminantes en un solo número que refleja la calidad del aire. Este índice ayuda a las personas a comprender fácilmente qué tan limpio o contaminado está el aire.'
    },
    {
      _id: 7,
      pregunta: '¿Qué efectos tiene la contaminación del aire a largo plazo?',
      respuesta: 'La exposición prolongada a la contaminación del aire puede provocar enfermedades crónicas como el asma, enfermedades cardiovasculares, cáncer de pulmón y disminución de la función pulmonar.'
    },
    {
      _id: 8,
      pregunta: '¿Qué fuentes contribuyen a la contaminación del aire?',
      respuesta: 'Las fuentes de contaminación del aire incluyen emisiones de vehículos, industrias, centrales eléctricas, quemas agrícolas, incendios forestales y actividades domésticas como el uso de productos químicos.'
    },
    {
      _id: 9,
      pregunta: '¿Cómo puedo reducir mi huella de contaminación del aire?',
      respuesta: 'Puedes reducir tu huella de contaminación del aire utilizando transporte público, caminando o andando en bicicleta en lugar de usar vehículos privados, reduciendo el consumo de energía, reciclando y usando productos ecoamigables.'
    },
    {
      _id: 10,
      pregunta: '¿Qué es la contaminación del aire interior?',
      respuesta: 'La contaminación del aire interior se refiere a la calidad del aire dentro de edificios y estructuras. Puede ser causada por productos de limpieza, materiales de construcción, equipos de calefacción y refrigeración, y otros contaminantes.'
    },
    {
      _id: 11,
      pregunta: '¿Cuáles son los síntomas comunes de la exposición a la contaminación del aire?',
      respuesta: 'Los síntomas comunes incluyen irritación de los ojos, nariz y garganta, tos, dificultad para respirar, opresión en el pecho y exacerbación de enfermedades respiratorias y cardiovasculares.'
    },
    {
      _id: 12,
      pregunta: '¿Qué poblaciones son más vulnerables a los efectos de la contaminación del aire?',
      respuesta: 'Los niños, los ancianos, las personas con enfermedades respiratorias y cardiovasculares, y aquellos con sistemas inmunológicos comprometidos son más vulnerables a los efectos de la contaminación del aire.'
    }
  ];

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
