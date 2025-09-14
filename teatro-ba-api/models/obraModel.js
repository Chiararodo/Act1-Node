const mongoose = require('mongoose');
const { Schema } = mongoose;

const obraSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  genero: { 
    type: String, required: true,
    enum: ['Drama','Comedia','Musical','Infantil','Tragedia','Performance','Otro']
  },
  teatro: { type: Schema.Types.ObjectId, ref: 'Teatro', required: true },
  duracionMin: { type: Number, min: 0 },
  elenco: [{ type: String, trim: true }],
  director: { type: String, trim: true },
  precioDesde: { type: Number, min: 0, required: true },
  estreno: { type: Date },
  funciones: [{ type: String, trim: true }],
  edad: { type: String, trim: true },
  descripcion: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Obra', obraSchema);
