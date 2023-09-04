const express = require("express");

const aliadoApiController = require("../../controllers/apiControllers/apiControllerAliados")

const router = express.Router();

//Endpoints

router.get("/apiAliado", aliadoApiController.getApiList)

router.get("/apiAliado/:id/detailApi", aliadoApiController.getApiDetail)

router.get("/apiAliado/lastAliado", aliadoApiController.getLastAliado)

module.exports = router