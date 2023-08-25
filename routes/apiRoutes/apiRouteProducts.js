const express = require("express");

const productController = require ("../../controllers/apiControllers/apiControllerProducts")

const router = express.Router();

//Endpoints

router.get("/apiProducts", productController.getList)

router.get("/apiProducts/:id/detailApi", productController.getDetail)

module.exports = router