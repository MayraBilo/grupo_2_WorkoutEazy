const express = require("express");

const mainController = require("../controllers/mainControllers");

const router = express.Router();

router.get("/", mainController.getIndex);

module.exports = router;
