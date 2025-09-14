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

// Conexión a Mongo
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectada'))
  .catch(err => {
    console.error('❌ Error MongoDB:', err.message);
    process.exit(1);
  });

// Home HTML con links (requisito del parcial)
app.get('/', (_req, res) => {
  res.send(`<!doctype html>
<html lang="es"><head><meta charset="utf-8"/>
<title>API Teatro BA</title><meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
 body{font-family:system-ui,Segoe UI,Roboto,sans-serif;line-height:1.5;max-width:880px;margin:2rem auto;padding:0 1rem}
 code{background:#f3f3f3;padding:.1rem .3rem;border-radius:4px}
 ul{margin-left:1.2rem}
 footer{margin-top:2rem;border-top:1px solid #ddd;padding-top:1rem;color:#555}
</style></head>
<body>
  <h1>API Teatro BA</h1>
  <p>API REST de obras de teatro en Buenos Aires.</p>
  <h2>Endpoints</h2>
  <ul>
    <li><a href="/api/teatros">Teatros</a></li>
    <li><a href="/api/obras">Obras</a></li>
  </ul>
  <p>Usá <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code> desde Postman.</p>
  <footer>Alumnas: Chiara Rodó y Morena Castro — Materia: Aplicaciones Híbridas — Docente: Jonathan E. Cruz — Comisión: DWM4AP</footer>
</body></html>`);
});

// Montaje de rutas (las completamos en la Parte 2)
app.use('/api/teatros', require('./routes/teatroRouter'));
app.use('/api/obras',   require('./routes/obraRouter'));

// Handler de errores simple
app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
