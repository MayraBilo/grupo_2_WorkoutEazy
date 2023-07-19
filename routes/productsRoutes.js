const express = require("express");
const path = require("path");

const productController = require("../controllers/productsControllers");

const router = express.Router();

// Middlewares

const uploadFile = require("../middlewares/multerMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

//@GET / product
router.get("/", productController.getList);

// @POST /product
router.post("/", uploadFile.single("image"), productController.postProduct);

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
  uploadFile.single("img"),
  productController.updateProduct
);

router.get("/productCart", authMiddleware, productController.getCart);

router.get("/profileServices", productController.getService);

router.get("/productListYoga", productController.getListYoga);
router.get("/productListFitness", productController.getListFitness);
router.get("/productListDeportes", productController.getListDeportes);
router.get("/productListDanzas", productController.getListDanzas);

module.exports = router;
