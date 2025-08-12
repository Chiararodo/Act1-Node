// ProductManager.js

class ProductManager {
    constructor() {
      this.products = [];
    }
  
    addProduct(product) {
      // Validar que todos los campos estén presentes
      const requiredFields = ["id", "name", "description", "price", "stock"];
      for (const field of requiredFields) {
        if (!product[field] && product[field] !== 0) {
          throw new Error(`El campo '${field}' es obligatorio`);
        }
      }
  
      // Validar que no se repita el id
      const exists = this.products.some(p => p.id === product.id);
      if (exists) {
        throw new Error(`Ya existe un producto con id ${product.id}`);
      }
  
      // Si pasa las validaciones, agregar al array
      this.products.push(product);
      console.log(`Producto agregado: ${product.name}`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error("Not found");
        return null;
      }
      return product;
    }
  }
  
  module.exports = ProductManager; // Exportar con CommonJS
  