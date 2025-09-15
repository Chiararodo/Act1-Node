const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controllers/usuarioController');

// CRUD de Usuarios
router.get('/',     usuarioCtrl.list);        // GET /api/usuarios
router.get('/:id',  usuarioCtrl.getById);     // GET /api/usuarios/:id
router.post('/',    usuarioCtrl.create);      // POST /api/usuarios
router.put('/:id',  usuarioCtrl.update);      // PUT /api/usuarios/:id
router.delete('/:id', usuarioCtrl.removeOne); // DELETE /api/usuarios/:id

module.exports = router;
