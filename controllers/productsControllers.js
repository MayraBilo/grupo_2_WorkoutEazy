const productModel = require("../models/product");
const db = require("../database/models");
const { validationResult } = require("express-validator");

const sharp = require("sharp");
const fs = require("fs");

const controller = {
  // OK
  getList: function (req, res) {
    db.Producto.findAll({ include: [{ association: "aliado_producto" }] }).then(
      function (productos) {
        res.render("productList", { productos: productos });
      }
    );
  },

  getEdit: (req, res) => {
    db.Producto.findByPk(req.params.id, {
      include: [{ association: "aliado_producto" }],
    }).then(function (producto) {
      res.render("editProduct", { producto: producto });
    });
  },
  getDetail: (req, res) => {
    db.Producto.findByPk(req.params.id, {
      include: [{ association: "aliado_producto" }],
    }).then(function (producto) {
      res.render("productDetail", { producto: producto });
    });
  },
  deleteProduct: async (req, res) => {
    try {
      await db.Producto.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.redirect("/product");
    } catch (error) {
      res.json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      // Cropper y sharp para redimensionar la imagen

      if (req.file) {
        const desiredWidth = 533;
        const desiredHeight = 800;
        const left = 0; // Coordenada X del punto de inicio del recorte
        const top = 0; // Coordenada Y del punto de inicio del recorte
        const width = 300; // Ancho del área a recortar
        const height = 300; // Alto del área a recortar

        const resizedImageBuffer = await sharp(req.file.buffer)
          .resize(desiredWidth, desiredHeight)
          .extract({ left, top, width, height })
          .toBuffer();

        // Generar un nombre de archivo único para la imagen redimensionada
        const uniqueFileName = Date.now() + "-" + req.file.originalname;

        // Guardar la imagen redimensionada en la ubicación deseada
        const outputImagePath = path.join(
          __dirname,
          "public/images/productos",
          uniqueFileName
        );
        fs.writeFileSync(outputImagePath, resizedImageBuffer);

        // Utilizar el nombre de archivo único para la imagen en lugar del original
        req.body.image = uniqueFileName;
      } else {
        // Si no se sube una nueva imagen, conserva la imagen actual en la base de datos
        req.body.image = req.body.file;
      }

      await db.Producto.update(
        {
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
          image: req.file ? req.file.filename : req.body.file,
          /*image: req.body.image,*/
          age: req.body.age,
          mode: req.body.mode,
          aliado_name: req.body.aliado_name,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.redirect(`/product/${req.params.id}/productDetail`);
    } catch (error) {
      res.json(error);
    }
  },

  getCreate: (req, res) => {
    res.render("createProduct");
  },

  getService: (req, res) => {
    res.render("profileServices");
  },

  getListYoga: function (req, res) {
    db.Producto.findAll().then(function (productos) {
      res.render("productListYoga", { productos: productos });
    });
  },

  getListFitness: (req, res) => {
    db.Producto.findAll().then(function (productos) {
      res.render("productListFitness", { productos: productos });
    });
  },

  getListDeportes: (req, res) => {
    db.Producto.findAll().then(function (productos) {
      res.render("productListDeportes", { productos: productos });
    });
  },

  getListDanzas: function (req, res) {
    db.Producto.findAll().then(function (productos) {
      res.render("productListDanzas", { productos: productos });
    });
  },

  postProduct: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        return res.render("createProduct", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }

      // Sharp para redimensionar imágenes
      /*
      const desiredWidth = 533;
      const desiredHeight = 800;

      let imageFileName = 'sin foto';

      if (req.file) {
        const resizedImageBuffer = await sharp (req.file.buffer)
        .resize (desiredWidth, desiredHeight)
        .toBuffer()
      
        // Generar un nombre de archivo único para la imagen redimensionada
        const uniqueFileName = Date.now() + '-' + req.file.originalname;

        // Guardar la imagen redimensionada en la ubicación deseada
        const outputImagePath = path.join(__dirname, 'public/images/productos', uniqueFileName);
        fs.writeFileSync(outputImagePath, resizedImageBuffer);

        // Usar el nombre de archivo único para la imagen en lugar del original
        imageFileName = uniqueFileName;
      } */

      const newProduct = {
        activity_name: req.body.activity_name,
        category: req.body.category,
        product_description: req.body.product_description,
        aliado_id: req.session.userLogged.id,
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
        mode: req.body.mode,
      };

      await db.Producto.create(newProduct);

      res.redirect("/product");
    } catch (error) {
      res.json(error);
    }
  },

  addCart: async (req, res) => {
    // console.log("id producto detail", req.query.producto_id);
    try {
      const productoId = req.query.producto_id;
      const clienteId = req.session.userLogged.id;

      let carrito = req.session.carrito;

      if (!carrito) {
        carrito = await db.Carrito.create({
          cliente_id: clienteId,
          /*producto_id: productoId,*/
        });

        req.session.carrito = carrito;
      }

      const carritoId = req.session.carrito.id;

      await db.ProductsCart.create({
        producto_id: productoId,
        carrito_id: carritoId,
      });

      res.redirect("/productCart");
    } catch (error) {
      res.json(error);
    }
  },

  filterProduct: async (req, res) => {
    try {
      const filtrosDificultad = req.body.dificultadcheck || [];
      const filtrosEdad = req.body.edadcheck || [];

      const filtro = {
        where: {},
      };

      if (filtrosDificultad.length > 0) {
        filtro.where.difficulty = filtrosDificultad;
      }

      if (filtrosEdad.length > 0) {
        filtro.where.age = filtrosEdad;
      }

      const productosFiltrados = await db.Producto.findAll(filtro);

      res.render("productList", { productos: productosFiltrados });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  filterProductYoga: async (req, res) => {
    try {
      const filtrosDificultad = req.body.dificultadcheck || [];
      const filtrosEdad = req.body.edadcheck || [];

      const filtro = {
        where: { category: "yoga" },
      };

      if (filtrosDificultad.length > 0) {
        filtro.where.difficulty = filtrosDificultad;
      }

      if (filtrosEdad.length > 0) {
        filtro.where.age = filtrosEdad;
      }

      const productosFiltrados = await db.Producto.findAll(filtro);

      res.render("productList", { productos: productosFiltrados });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  filterProductFitness: async (req, res) => {
    try {
      const filtrosDificultad = req.body.dificultadcheck || [];
      const filtrosEdad = req.body.edadcheck || [];

      const filtro = {
        where: { category: "Fitness" },
      };

      if (filtrosDificultad.length > 0) {
        filtro.where.difficulty = filtrosDificultad;
      }

      if (filtrosEdad.length > 0) {
        filtro.where.age = filtrosEdad;
      }

      const productosFiltrados = await db.Producto.findAll(filtro);

      res.render("productList", { productos: productosFiltrados });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  filterProductDeportes: async (req, res) => {
    try {
      const filtrosDificultad = req.body.dificultadcheck || [];
      const filtrosEdad = req.body.edadcheck || [];

      const filtro = {
        where: { category: "Deportes" },
      };

      if (filtrosDificultad.length > 0) {
        filtro.where.difficulty = filtrosDificultad;
      }

      if (filtrosEdad.length > 0) {
        filtro.where.age = filtrosEdad;
      }

      const productosFiltrados = await db.Producto.findAll(filtro);

      res.render("productList", { productos: productosFiltrados });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
  filterProductDanzas: async (req, res) => {
    try {
      const filtrosDificultad = req.body.dificultadcheck || [];
      const filtrosEdad = req.body.edadcheck || [];

      const filtro = {
        where: { category: "Danzas" },
      };

      if (filtrosDificultad.length > 0) {
        filtro.where.difficulty = filtrosDificultad;
      }

      if (filtrosEdad.length > 0) {
        filtro.where.age = filtrosEdad;
      }

      const productosFiltrados = await db.Producto.findAll(filtro);

      res.render("productList", { productos: productosFiltrados });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  },
};

module.exports = controller;
