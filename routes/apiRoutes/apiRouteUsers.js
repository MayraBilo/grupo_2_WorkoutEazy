const express = require("express");

const userApiController = require("../../controllers/ApiControllers/apiControllerUsers")

const router = express.Router();

//Endpoints

router.get("/apiUser", userApiController.getApiList)

router.get("/apiUser/:id/detailApi", userApiController.getApiDetail)

module.exports = router