const express = require("express");

const userControllers = require("../controllers/userControllers");

const router = express.Router();

// Formulario de login
router.get('/login', userControllers.getLogin);

// Formulario de registro
router.get('/register', userControllers.getRegister);
router.get('/registerAliados', userControllers.getRegisterAliados);

// Perfil de usuario

router.get('/perfilCliente', userControllers.clientProfile);
router.get('/perfilAliado', userControllers.getAliadoProfile);

module.exports = router;
