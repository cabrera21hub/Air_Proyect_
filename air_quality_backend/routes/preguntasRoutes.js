const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');

// Obtener todas las preguntas
router.get('/', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear una nueva pregunta
router.post('/', async (req, res) => {
  const pregunta = new Pregunta({
    pregunta: req.body.pregunta,
    respuesta: req.body.respuesta,
  });

  try {
    const nuevaPregunta = await pregunta.save();
    res.status(201).json(nuevaPregunta);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
