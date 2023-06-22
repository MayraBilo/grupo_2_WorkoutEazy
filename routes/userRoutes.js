const express = require("express");

const router = express.Router();

const path = require ('path');

// Controller

const userControllers = require("../controllers/userControllers");

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware.js');


// Formulario de login
router.get('/login', userControllers.getLogin);

// Formulario de registro
router.get('/register', userControllers.getRegister);
router.get('/registerAliados', userControllers.getRegisterAliados);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), userControllers.processRegister);

// Perfil de usuario

router.get('/perfilCliente', userControllers.clientProfile);
router.get('/perfilAliado', userControllers.getAliadoProfile);

module.exports = router;
