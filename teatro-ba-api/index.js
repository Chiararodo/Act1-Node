// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos (index.html + css) desde /public
app.use(express.static('public'));

// Conexión a Mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectada'))
  .catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });

// Rutas API
app.use('/api/teatros', require('./routes/teatroRouter'));
app.use('/api/obras',   require('./routes/obraRouter'));
app.use('/api/usuarios', require('./routes/usuarioRouter'));

// Handler de errores simple
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
