// server.js
const chalk = require('chalk');
const express = require('express');
const Product = require('./Product');

const port = process.env.PORT || 3000;
const api = express();

const modelProduct = new Product(); // pásale './data/products.json' si tu clase lo necesita

// Home
const home = (request, response) => {
  console.log(chalk.red('Se accedió a la home'));
  response.send(`
    <h1>Hola desde express!</h1>
    <ul>
      <li><a href="/contactos">Contactos</a></li>
      <li><a href="/api/productos">Productos</a></li>
      <li><a href="/api/productos/1">Producto por ID</a></li>
    </ul>
  `);
};
api.get('/', home);

api.get('/contactos', (request, response) => {
  response.send('<h1>Contactos</h1>');
});

/**
 * GET /api/productos  (alias: /api/products)
 */
api.get(['/api/productos', '/api/products'], async (request, response) => {
  try {
    const list = await modelProduct.getProducts();
    console.table(list);
    response.json(list);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Error al obtener los productos' });
  }
});

/**
 * GET /api/productos/:id  (alias: /api/products/:id)
 */
api.get(['/api/productos/:id', '/api/products/:id'], async (request, response) => {
  try {
    const id = Number(request.params.id);
    if (Number.isNaN(id)) {
      return response.status(400).json({ error: 'El id debe ser numérico' });
    }

    const product = await modelProduct.getProductById(id);
    if (!product) {
      return response.status(404).json({ error: `No existe producto con id ${id}` });
    }

    response.json(product);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: 'Error al obtener el producto' });
  }
});

console.log(chalk.bgGreen('API REST'));
api.listen(port, () => {
  console.log(chalk.green(`Servidor en http://localhost:${port}`));
});
