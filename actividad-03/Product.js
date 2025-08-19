// Product.js
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

class ProductManager {
  constructor(options = {}) {
    this.dataDir = options.dataDir || path.resolve(__dirname, 'data');
    this.dataFile = options.dataFile || path.join(this.dataDir, 'products.json');
  }

  async #ensureStorage() {
    await fs.mkdir(this.dataDir, { recursive: true });
    try {
      await fs.access(this.dataFile);
    } catch {
      await fs.writeFile(this.dataFile, '[]', 'utf-8');
    }
  }

  async #readAll() {
    await this.#ensureStorage();
    const raw = await fs.readFile(this.dataFile, 'utf-8');
    return JSON.parse(raw);
  }

  async #writeAll(products) {
    await this.#ensureStorage();
    await fs.writeFile(this.dataFile, JSON.stringify(products, null, 2), 'utf-8');
  }

  // Validaciones básicas (0 permitido en price/stock)
  #validate(prod) {
    const required = ['name', 'description', 'price', 'stock'];
    for (const f of required) {
      const v = prod[f];
      const emptyStr = typeof v === 'string' && v.trim() === '';
      const missing = v === undefined || v === null || emptyStr;
      if (missing && v !== 0) throw new Error(`El campo '${f}' es obligatorio`);
    }
    if (typeof prod.price !== 'number' || prod.price < 0) {
      throw new Error('price debe ser un número >= 0');
    }
    if (!Number.isInteger(prod.stock) || prod.stock < 0) {
      throw new Error('stock debe ser un entero >= 0');
    }
  }

  // CRUD -------------------------------------------------------------

  async addProduct(product) {
    this.#validate(product);
    const products = await this.#readAll();
    // Generar id si no vino uno
    if (product.id == null) product.id = crypto.randomUUID();
    // Evitar duplicados si lo pasan desde afuera
    if (products.some(p => String(p.id) === String(product.id))) {
      throw new Error(`Ya existe un producto con id ${product.id}`);
    }
    products.push(product);
    await this.#writeAll(products);
    return product;
  }

  async getProducts() {
    return await this.#readAll();
  }

  async getProductById(id) {
    const products = await this.#readAll();
    const prod = products.find(p => String(p.id) === String(id));
    return prod || null;
  }

  // Requerido por la consigna: eliminar por id + persistir + "Not found"
  async deleteProductById(id) {
    const products = await this.#readAll();
    const next = products.filter(p => String(p.id) !== String(id));
    if (next.length === products.length) {
      console.error('Not found');
      return false; // no lo pide la consigna, pero ayuda al caller
    }
    await this.#writeAll(next);
    return true;
  }

  // Requerido por la consigna: update por id + persistir + "Not found" y {}
  async updateProductById(id, product) {
    const products = await this.#readAll();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) {
      console.error('Not found');
      return {}; // EXACTO como pide la consigna
    }
    const updated = { ...products[idx], ...product, id: products[idx].id };
    // Validar el resultado final
    this.#validate(updated);
    products[idx] = updated;
    await this.#writeAll(products);
    return updated;
  }
}

module.exports = ProductManager;
