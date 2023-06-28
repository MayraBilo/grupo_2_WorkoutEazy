const express = require("express");

const router = express.Router();

const path = require("path");

// Controller

const userControllers = require("../controllers/userControllers");

// Middlewares
const uploadFile = require("../middlewares/multerMiddleware.js");
const validations = require("../middlewares/validateRegisterMiddleware.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");


// Formulario de login
router.get("/login", guestMiddleware, userControllers.getLogin);

// Procesar el login
router.post("/login", userControllers.processLogin);

// Formulario de registro
router.get("/register", guestMiddleware, userControllers.getRegister);


// Procesar el registro
router.post(
  "/register",
  uploadFile.single("avatar"),
  validations,
  userControllers.processRegister
);

// Perfil de usuario

router.get("/perfilCliente", authMiddleware, userControllers.clientProfile);
<<<<<<< HEAD

=======
router.get("/:id/perfilAliado", userControllers.getAliadoProfile);

// Editar perfil aliado
router.get("/:id/editPerfilAliado", userControllers.getEditAliado);
router.put("/:id/editPerfilAliado", userControllers.uploadAliado);
>>>>>>> e394ed4a2fd21d6c1d3fb16a1f2c809a60e6c8f0

// Logout

router.get("/logout", authMiddleware, userControllers.logout);

module.exports = router;
