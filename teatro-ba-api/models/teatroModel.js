const mongoose = require('mongoose');

const teatroSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  barrio: { type: String, required: true, trim: true },
  direccion: { type: String, required: true, trim: true },
  capacidad: { type: Number, min: 1, required: true },
  web: { type: String, trim: true },
  telefono: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Teatro', teatroSchema);
