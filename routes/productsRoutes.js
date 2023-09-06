const express = require("express");
const path = require("path");

const productController = require("../controllers/productsControllers");

const router = express.Router();

// Middlewares

const uploadFile = require("../middlewares/multerMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const validations = require("../middlewares/validateCreateProduct");

//@GET / product
router.get("/", productController.getList);

// @POST /product
router.post(
  "/",
  uploadFile.single("image"),
  validations,
  productController.postProduct
);

// @GET /product/create
router.get("/createProduct", productController.getCreate);

// @GET /product/:id/detail ---> /products/5/detail
router.get("/:id/productDetail", productController.getDetail);

// @DELETE /product/:id/delete ---> /products/5/delete
router.delete("/:id/delete", productController.deleteProduct);

// @GET /product/:id/update
router.get("/:id/editProduct", productController.getEdit);

// @PUT /product/:id/update ---> /products/5/put
router.put(
  "/:id/editProduct",
  uploadFile.single("image"),
  productController.updateProduct
);
// @GET /products/productCart
router.get("/productCart/add", productController.addCart);

router.get("/profileServices", productController.getService);

router.get("/productListYoga", productController.getListYoga);
router.get("/productListFitness", productController.getListFitness);
router.get("/productListDeportes", productController.getListDeportes);
router.get("/productListDanzas", productController.getListDanzas);

// @POST filtrar por edad y dificultas
router.post("/filtrarProductos", productController.filterProduct);
router.post("/filtrarProductosYoga", productController.filterProductYoga);
router.post("/filtrarProductosFitness", productController.filterProductFitness);
router.post(
  "/filtrarProductosDeportes",
  productController.filterProductDeportes
);
router.post("/filtrarProductosDanzas", productController.filterProductDanzas);

module.exports = router;
