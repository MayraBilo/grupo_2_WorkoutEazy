const path = require("path");
const productModel = require('../models/product');

const controller = {
    getList: (req, res) => {
        const productos = productModel.findAll();
        res.render("productList", {
            products: productos,
        })
    },
    getEdit: (req, res) => {
        const id = Number(req.params.id);

        const productoAModificar = productModel.findById(id)

        if (!productoAModificar) {
            return res.send('error de id');
        }

        res.render("editeProduct", {
            products: productoAModificar
        });
    },
    getDetail: (req, res) => {
        const id = Number(req.params.id);

        const productoAMostrar = productModel.findById(id);

        if (!productoAMostrar) {
            return res.send('error de id');
        }

        res.render("productDetail", {products: productoAMostrar })
    },
    deleteProduct: (req, res) => {
        const id = Number(req.params.id);

        productModel.deleteById(id);

        res.redirect('/products');
    },
    updateProduct: (req, res) => {
        const id = Number(req.params.id);
        const nuevosDatos = req.body;

        productModel.updateById(id, nuevosDatos);

        res.redirect('/products');
    },
    getCart: (req, res) => {
        let products = productModel.findAll()
        res.render("productCart", {
            products: products})
    },
    getCreate: (req, res) => {
        res.render("createProduct")
    },
    getService: (req, res) => {
        res.render("profileServices")
    },
    getListYoga: (req, res) => {
        res.render("productListYoga")
    },
    getListFitness: (req, res) => {
        res.render("productListFitness")
    },
    getListDeportes: (req, res) => {
        res.render("productListDeportes")
    },
    getListDanzas: (req, res) => {
        res.render("productListDanzas")
    },
    postProduct: (req, res) => {
        let datos = req.body;

        datos.price = Number(datos.price);
       
        datos.imgs = req.files.map(file => '/images/products' + file.filename);

        productModel.createOne(datos);

        res.redirect('/products');
    }
};

module.exports = controller;