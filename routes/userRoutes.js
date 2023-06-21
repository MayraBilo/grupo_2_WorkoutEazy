const express = require("express");

const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/login", userControllers.getLogin);

router.post("/", userControllers.postLogin);

router.get("/register", userControllers.getRegister);
router.post("/", userControllers.postRegister);

router.get("/registerAliados", userControllers.getRegisterAliados);
router.post("/", userControllers.postRegisterAliados);

module.exports = router;
