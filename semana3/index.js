const Product = require('./Product');
const model = new Product();


console.log('Inicio de la Promesa');
/* model.getProducts().then( lista => {
    console.table(lista);
}) */

async function mostrar(){
    const lista = await model.getProducts();
    console.table(lista);
}
//mostrar();
console.log('Fin de la Promesa');

async function buscar(id) {
    const product = await model.getProductById(id);
    console.log(product);
}

buscar('40743f69-63c9-4ece-84b7-cd3a7f616b23');
/* model.addProduct ( {
    name: 'Teclado dos',
    description: 'Teclado Mecánico',
    price: 25000,
    stock: 25
});

model.addProduct ( {
    name: 'Mouse',
    description: 'Mouse',
    price: 15000,
    stock: 20
});  */
