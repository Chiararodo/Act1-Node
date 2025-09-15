const Usuario = require('../models/usuarioModel');

// GET /api/usuarios
const list = async (_req, res, next) => {
  try {
    const usuarios = await Usuario.find().sort({ nombre: 1 });
    res.json(usuarios);
  } catch (err) { next(err); }
};

// GET /api/usuarios/:id
const getById = async (req, res, next) => {
  try {
    const u = await Usuario.findById(req.params.id);
    if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(u);
  } catch (err) { next(err); }
};

// POST /api/usuarios
const create = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: 'nombre, email y password son obligatorios' });
    }
    const created = await Usuario.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
    }
    next(err);
  }
};

// PUT /api/usuarios/:id
const update = async (req, res, next) => {
  try {
    const updated = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE /api/usuarios/:id
const removeOne = async (req, res, next) => {
  try {
    const deleted = await Usuario.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

module.exports = { list, getById, create, update, removeOne };
