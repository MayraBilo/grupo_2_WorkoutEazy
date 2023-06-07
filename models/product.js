const { log } = require('console');
const fs = require('fs');
const path = require('path');

const model = {
    route: '../data/products.json',

    findAll: function () {
        const productsJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');
        const products = JSON.parse(productsJSON);

        return products;
    },

    findById: function (id) {
        const products = this.findAll();

        let searched = products.find(product => product.id === id);

        if (!searched) {
            searched = null;
        }

        return searched;
    },

    deleteById: function (id) {
        let products = this.findAll();

        products = products.filter(product => product.id !== id);

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);

        return products;
    },

    updateById: function (id, newData) {
        let products = this.findAll();

        const indice = products.findIndex(productoActual => productoActual.id === id);

        products[indice].categoria = newData.categoria;
        products[indice].subcategoria = newData.subcategoria;
        products[indice].img = newData.img;
        products[indice].nombreActividad = newData.nombreActividad;
        products[indice].nombreAliado = newData.nombreAliado;
        products[indice].dificultad = newData.dificultad;
        products[indice].edadesAlumnos = newData.edadesAlumnos;
        products[indice].valor = newData.valor;
        products[indice].cupos = newData.cupos;
        products[indice].descripcion = newData.descripcion;
        products[indice].direccion = newData.direccion;
        products[indice].horarios = newData.horarios;
        products[indice].duracion = newData.duracion;
        products[indice].presencial = newData.presencial;
        products[indice].virtual = newData.virtual;
        
        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(dirname, this.route), productsJSON);

        return products;
    },
    createOne: function (newProduct) {
        let products = this.findAll();

        newProduct.id = products[products.length - 1].id + 1;

        products.push(newProduct);

        const productsJSON = JSON.stringify(products);

        fs.writeFileSync(path.join(__dirname, this.route), productsJSON);
    }
}

module.exports = model;