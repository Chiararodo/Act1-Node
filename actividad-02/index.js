// index.js
const ProductManager = require("./ProductManager");

// Crear instancia
const pm = new ProductManager();

// Agregar productos
pm.addProduct({
  id: 1,
  name: 'Teclado',
  description: 'Teclado Mecánico',
  price: 25000,
  stock: 25
});

pm.addProduct({
  id: 2,
  name: 'Mouse',
  description: 'Mouse Inalámbrico',
  price: 12000,
  stock: 15
});

// Mostrar todos los productos
console.log("Lista de productos:", pm.getProducts());

// Buscar producto por ID
console.log("Producto con ID 1:", pm.getProductById(1));
console.log("Producto con ID 99:", pm.getProductById(99)); // Not found
