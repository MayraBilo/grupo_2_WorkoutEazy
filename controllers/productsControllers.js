const productModel = require("../models/product");
const db = require("../database/models");

const controller = {

  getList: function(req,res) {
    db.Producto.findAll()
        .then(function(productos){
            res.render("productList", {productos:productos})
        })
  },
 
  getEdit: (req, res) => {
    const id = Number(req.params.id);

    const productoAModificar = productModel.findById(id);

    if (!productoAModificar) {
      return res.send("error de id");
    }

    res.render("editProduct", {
      products: productoAModificar,
    });
  },
  getDetail: (req, res) => {
    const id = Number(req.params.id);

    const productoAMostrar = productModel.findById(id);

    if (!productoAMostrar) {
      return res.send("error de id");
    }

    res.render("productDetail", { products: productoAMostrar });
  },
  deleteProduct: (req, res) => {
    const id = Number(req.params.id);

    productModel.deleteById(id);

    res.redirect("/product");
  },
  updateProduct: (req, res) => {
    const id = Number(req.params.id);
    const nuevosDatos = req.body;
    nuevosDatos.img = req.file ? req.file.filename : req.body.oldImage;

    productModel.updateById(id, nuevosDatos);

    res.redirect("/product");
  },
  getCart: (req, res) => {
    let products = productModel.findAll();
    res.render("productCart", {
      products: products,
    });
  },
  getCreate: (req, res) => {
    res.render("createProduct");
  },
  getService: (req, res) => {
    res.render("profileServices");
  },

  getListYoga: (req, res) => {
    const productos = productModel.findAll();
    res.render("productListYoga", {
      products: productos,
    });
  },

  getListFitness: (req, res) => {
    const productos = productModel.findAll();
    res.render("productListFitness", {
      products: productos,
    });
  },

  getListDeportes: (req, res) => {
    const productos = productModel.findAll();
    res.render("productListDeportes", {
      products: productos,
    });
  },

  getListDanzas: (req, res) => {
    const productos = productModel.findAll();
    res.render("productListDanzas", {
      products: productos,
    });
  },

  postProduct: (req, res) => {
    let datos = req.body;

    datos.id = productModel.length + 1;

    datos.valor = Number(datos.valor);

    /*datos.img = req.files.map(file => `/images/productos/${file.filename}`);*/
    datos.img = req.file ? req.file.filename : "sin foto";

    productModel.createOne(datos);

    res.redirect("/product");
    res.redirect("/productListDanzas");
    res.redirect("/productListDeportes");
    res.redirect("/productListFitness");
    res.redirect("/productListYoga");
  },
};

module.exports = controller;
