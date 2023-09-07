const express = require("express");

const router = express.Router();

// Controller

const userControllers = require("../controllers/userControllers");
const aliadosControllers = require("../controllers/aliadosControllers");

// Middlewares Cliente
const validations = require("../middlewares/validateRegisterMiddleware.js");
const uploadFileCliente = require("../middlewares/multerMiddlewareCliente.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Middlewares Aliados
const uploadFileAliado = require("../middlewares/multerMiddlewareAliado.js");
const validationsAliados = require("../middlewares/validateRegisterAliadosMiddleware.js");
const authMiddlewareAliado = require("../middlewares/authMiddlewareAliado.js");
const guestMiddlewareAliados = require("../middlewares/guestMiddlewareAliados.js");

//USUARIOS login

// Formulario de login
router.get(
  "/login",
  [guestMiddleware, guestMiddlewareAliados],
  userControllers.getLogin
);
router.get(
  "/loginAliado",
  guestMiddlewareAliados,
  aliadosControllers.getLoginAliado
);

// Procesar el login
router.post("/login", userControllers.processLogin);
router.post("/loginAliado", aliadosControllers.loginAliado);

// USUARIOS registros

// Formulario registroClientes
router.get(
  "/register",
  [guestMiddleware, guestMiddlewareAliados],
  userControllers.getRegister
);

// Procesar registroClientes
router.post(
  "/register",
  uploadFileCliente.single("avatar"),
  validations,
  userControllers.processRegister
);

// Formulario registroAliado
router.get(
  "/registerAliados",
  guestMiddlewareAliados,
  aliadosControllers.getRegisterAliados
);

// Procesar registroAliados
router.post(
  "/registerAliados",
  uploadFileAliado.single("avatar"),
  validationsAliados,
  aliadosControllers.registerAliados
);

//CLIENTE

// Perfil de cliente

router.get("/perfilCliente", authMiddleware, userControllers.clientProfile);

// Carrito

router.get("/productCart", authMiddleware, userControllers.getCart);
router.get("/removeFromCart/:productoId", authMiddleware, userControllers.deleteCart);

// Edit Perfil cliente
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

//Delete Perfil cliente
router.delete("/:id/delete", userControllers.deleteProfile);

//ALIADO

// Perfil Aliado
router.get(
  "/perfilAliado",
  authMiddlewareAliado,
  aliadosControllers.getAliadoProfile
);

// Edit Perfil Aliado
router.get(
  "/:id/editPerfilAliado",
  authMiddlewareAliado,
  aliadosControllers.getUpdateAliado
);
router.put(
  "/:id/editPerfilAliado",
  [authMiddlewareAliado, uploadFileCliente.single("avatar")],
  userControllers.updateAliado
);

//USUARIOS logout

// Logout usuarios

router.get("/logout", authMiddleware, userControllers.logout);
router.get(
  "/logoutAliado",
  authMiddlewareAliado,
  aliadosControllers.logoutAliado
);

module.exports = router;
