const express = require("express");

const router = express.Router();

const path = require("path");

// Controller

const userControllers = require("../controllers/userControllers");
const aliadosControllers = require("../controllers/aliadosControllers");

// Middlewares
const uploadFile = require("../middlewares/multerMiddleware.js");
const validations = require("../middlewares/validateRegisterMiddleware.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Middleware Aliados
const uploadFileAliado = require("../middlewares/multerMiddlewareAliado.js");
const uploadFileCliente = require("../middlewares/multerMiddlewareCliente.js");
const validationsAliados = require("../middlewares/validateRegisterAliadosMiddleware.js");
const authMiddlewareAliado = require("../middlewares/authMiddlewareAliado.js");
const guestMiddlewareAliados = require("../middlewares/guestMiddlewareAliados.js");

// Formulario de login
router.get("/login", guestMiddleware, userControllers.getLogin);
router.get("/loginAliado", aliadosControllers.getLoginAliado);

// Procesar el login
router.post("/login", userControllers.processLogin);
router.post("/loginAliado", aliadosControllers.loginAliado);

// Formulario de registro
router.get("/register", guestMiddleware, userControllers.getRegister);

// Procesar el registro
router.post(
  "/register",
  uploadFileCliente.single("avatar"),
  validations,
  userControllers.processRegister
);

// Formulario de registroAliado
router.get(
  "/registerAliados",
  guestMiddlewareAliados,
  aliadosControllers.getRegisterAliados
);

// Procesar el registroAliados
router.post(
  "/registerAliados",
  uploadFileAliado.single("avatar"),
  validationsAliados,
  aliadosControllers.registerAliados
);

// Edit Perfil de Aliado
router.get(
  "/:id/editPerfilAliado",
  guestMiddlewareAliados,
  aliadosControllers.getUpdateAliado
);
router.put(
  "/:id/editPerfilAliado",
  [guestMiddlewareAliados, uploadFileCliente.single("avatar")],
  userControllers.updateProfile
);

// Perfil de usuario

router.get("/perfilCliente", authMiddleware, userControllers.clientProfile);

// Edit Perfil de usuario
router.get(
  "/:id/editPerfilCliente",
  authMiddleware,
  userControllers.getUpdateCliente
);
router.put(
  "/:id/editPerfilCliente",
  [authMiddleware, uploadFileCliente.single("avatar")],
  userControllers.updateProfile
);

//Delete Perfil Usuario
router.delete("/:id/delete", userControllers.deleteProfile);

// Perfil de usuarioAliado
router.get("/perfilAliado", aliadosControllers.getAliadoProfile);

// Logout

router.get("/logout", authMiddleware, userControllers.logout);
router.get(
  "/logoutAliado",
  authMiddlewareAliado,
  aliadosControllers.logoutAliado
);

module.exports = router;
