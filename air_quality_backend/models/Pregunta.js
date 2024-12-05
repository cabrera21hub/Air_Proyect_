const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: true,
  },
  respuesta: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);
