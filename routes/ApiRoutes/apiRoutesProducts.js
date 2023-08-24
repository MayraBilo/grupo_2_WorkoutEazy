const express = require("express");

const productController = require("../controllers/ApiControllers/apiControllerProduct");

const router = express.Router();

router.get("/api/products", productController.getList)

router.get("/api/:id/products", productController.getDetail)