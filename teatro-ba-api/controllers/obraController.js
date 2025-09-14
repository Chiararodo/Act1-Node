const Obra = require('../models/obraModel');

// GET /api/obras
const list = async (req, res, next) => {
  try {
    const { q, genero, precioMax, teatroId } = req.query;
    const where = {};
    if (q) where.titulo = { $regex: q, $options: 'i' };
    if (genero) where.genero = genero;
    if (precioMax) where.precioDesde = { $lte: Number(precioMax) };
    if (teatroId) where.teatro = teatroId;

    const obras = await Obra.find(where)
      .populate('teatro', 'nombre barrio')
      .sort({ titulo: 1 });

    res.json(obras);
  } catch (err) { next(err); }
};

// GET /api/obras/:id
const getById = async (req, res, next) => {
  try {
    const obra = await Obra.findById(req.params.id)
      .populate('teatro', 'nombre barrio direccion');
    if (!obra) return res.status(404).json({ error: 'Obra no encontrada' });
    res.json(obra);
  } catch (err) { next(err); }
};

// POST /api/obras
const create = async (req, res, next) => {
  try {
    const { titulo, genero, teatro, precioDesde } = req.body;
    if (!titulo || !genero || !teatro || precioDesde === undefined) {
      return res.status(400).json({ error: 'titulo, genero, teatro y precioDesde son obligatorios' });
    }
    const created = await Obra.create(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

// PUT /api/obras/:id
const update = async (req, res, next) => {
  try {
    const updated = await Obra.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Obra no encontrada' });
    res.json(updated);
  } catch (err) { next(err); }
};

// DELETE /api/obras/:id
const removeOne = async (req, res, next) => {
  try {
    const deleted = await Obra.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Obra no encontrada' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

module.exports = { list, getById, create, update, removeOne };
