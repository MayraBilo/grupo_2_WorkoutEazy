const express = require("express");

const mainController = require("../controllers/mainControllers");

const router = express.Router();

router.get("/", mainController.getIndex);

router.get("/blog", mainController.getBlog);

router.get("/productSearch", mainController.getSearch)

module.exports = router;
