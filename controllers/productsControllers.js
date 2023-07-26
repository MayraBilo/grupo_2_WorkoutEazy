const productModel = require("../models/product");
const db = require("../database/models");

const controller = {
  // OK
  getList: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productList", { productos: productos })
      })
  },

  getEdit: (req, res) => {

    db.Producto.findByPk(req.params.id)

      .then(function (producto) {
        res.render("editProduct", { producto: producto })
      })

  },
  getDetail: (req, res) => {

    db.Producto.findByPk(req.params.id)

      .then(function (producto) {
        res.render("productDetail", { producto: producto })
      })


  },
  deleteProduct: async (req, res) => {
    try{
    await db.Producto.destroy({
      where: {
        id: req.params.id
      }
    })
    res.redirect("/product")
  }catch(error){
    res.json(error)
  }
  },

  updateProduct: async (req, res) => {
    try{
      await db.Producto.update( {
      activity_name: req.body.activity_name,
      category: req.body.category,
      subcategory: req.body.subcategory,
      product_description: req.body.product_description,
      aliado: req.body.aliado_id,
      price: req.body.price,
      discount: req.body.discount,
      spots: req.body.spots,
      schedule: req.body.schedule,
      length: req.body.length,
      difficulty: req.body.difficulty,
      adress: req.body.adress,
      city: req.body.city,
      image: req.file ? req.file.filename : "sin foto",
      age: req.body.age,
      mode: req.body.mode,
      aliado_name: req.body.aliado_name
    },
    {
      where: {
        id: req.params.id
      }
    })

    res.redirect(`/product/${req.params.id}/productDetail`);

  }catch(error){
      res.json(error)
    }
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

  getListYoga: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListYoga", { productos: productos })
      })
  },

  getListFitness: (req, res) => {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListFitness", { productos: productos })
      })
  },

  getListDeportes: (req, res) => {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListDeportes", { productos: productos })
      })
  },

  getListDanzas: function (req, res) {
    db.Producto.findAll()
      .then(function (productos) {
        res.render("productListDanzas", { productos: productos })
      })

  },

  postProduct: async (req, res) => {

      try{

      const newProduct = {
      activity_name: req.body.activity_name,
      category: req.body.category,
      product_description: req.body.product_description,
      aliado: req.body.aliado_id,
      price: req.body.price,
      discount: req.body.discount,
      spots: req.body.spots,
      schedule: req.body.schedule,
      length: req.body.length,
      difficulty: req.body.difficulty,
      adress: req.body.adress,
      image: req.file ? req.file.filename : "sin foto",
      city: req.body.city,
      age: req.body.age,
      mode: req.body.mode}
      

    await db.Producto.create(newProduct)

    res.redirect("/product");
    
      } catch (error) {
        res.json(error)
      }

  },

};

module.exports = controller;
