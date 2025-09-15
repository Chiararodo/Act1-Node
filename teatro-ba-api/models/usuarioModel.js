const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre es muy corto'],
      maxlength: [80, 'El nombre es muy largo'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    telefono: {
      type: String,
      trim: true,
      default: '',
    },
    rol: {
      type: String,
      enum: ['usuario', 'admin'],
      default: 'usuario',
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [4, 'La contraseña es demasiado corta'],
    },
    foto: {
      type: String,
      trim: true,
      default: '',
    }
  },
  { timestamps: true }
);

module.exports = model('Usuario', UsuarioSchema);
