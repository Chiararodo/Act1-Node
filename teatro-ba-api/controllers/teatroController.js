const Teatro = require('../models/teatroModel');

// GET /api/teatros
const list = async (_req, res, next) => {
  try {
    const teatros = await Teatro.find().sort({ nombre: 1 });
    res.json(teatros);
  } catch (err) { next(err); }
};

// GET /api/teatros/:id
const getById = async (req, res, next) => {
  try {
    const teatro = await Teatro.findById(req.params.id);
    if (!teatro) return res.status(404).json({ error: 'Teatro no encontrado' });
    res.json(teatro);
  } catch (err) { next(err); }
};

// POST /api/teatros
const create = async (req, res, next) => {
  try {
    const { nombre, barrio, direccion, capacidad, web, telefono } = req.body;
    if (!nombre || !barrio || !direccion || !capacidad) {
      return res.status(400).json({ error: 'nombre, barrio, direccion y capacidad son obligatorios' });
    }
    const created = await Teatro.create({ nombre, barrio, direccion, capacidad, web, telefono });
    res.status(201).json(created);
  } catch (err) { next(err); }
};

// PUT /api/teatros/:id
const update = async (req, res, next) => {
  try {
    const updated = await Teatro.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Teatro no encontrado' });
    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE /api/teatros/:id
const removeOne = async (req, res, next) => {
  try {
    const deleted = await Teatro.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Teatro no encontrado' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

module.exports = { list, getById, create, update, removeOne };
