const express = require("express");

const productApiController = require ("../../controllers/apiControllers/apiControllerProducts")

const router = express.Router();

//Endpoints

router.get("/apiProducts", productApiController.getApiList)

router.get("/apiProducts/:id/detailApi", productApiController.getApiDetail)