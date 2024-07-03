const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/air_quality_db';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

const preguntaSchema = new mongoose.Schema({
  pregunta: String,
  respuesta: String
});

const Pregunta = mongoose.model('Pregunta', preguntaSchema);

app.get('/preguntas', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/preguntas', async (req, res) => {
  const { pregunta, respuesta } = req.body;
  try {
    const nuevaPregunta = new Pregunta({ pregunta, respuesta });
    await nuevaPregunta.save();
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
