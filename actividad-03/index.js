const ProductManager = require('./Product');
const pm = new ProductManager();

async function main() {
  try {
    console.log('--- LISTA INICIAL ---');
    console.table(await pm.getProducts());

    // Crear
    const nuevo = await pm.addProduct({
      name: 'Galletitas Oreo',
      description: 'Clásicas',
      price: 1200,
      stock: 50
    });
    console.log('Creado:', nuevo);

    // Leer por id
    console.log('Por ID:', await pm.getProductById(nuevo.id));

    // Update (cumple: si no existe -> "Not found" y {})
    const afterUpdate = await pm.updateProductById(nuevo.id, { price: 1500, stock: 60 });
    console.log('Actualizado:', afterUpdate);

    // Delete (cumple: si no existe -> "Not found")
    const deleted = await pm.deleteProductById(nuevo.id);
    console.log('Eliminado?', deleted);

    console.log('--- LISTA FINAL ---');
    console.table(await pm.getProducts());
  } catch (e) {
    console.error('Error:', e.message);
    process.exitCode = 1;
  }
}

main();
