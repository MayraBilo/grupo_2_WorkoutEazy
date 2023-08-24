const express = require("express");

const productController = require ("../../controllers/apiControllers/apiControllerProducts")

const router = express.Router();

//Endpoints

router.get("/api/apiProducts", productController.getList)

router.get("/api/:id/apiProducts", productController.getDetail)