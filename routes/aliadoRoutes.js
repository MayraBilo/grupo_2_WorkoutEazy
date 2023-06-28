const express = require("express");

const router = express.Router();

const path = require("path");

// Controller

const aliadosControllers = require("../controllers/aliadosControllers");

// Middlewares


const uploadFileAliado = require("../middlewares/multerMiddlewareAliado.js");
const validationsAliados = require("../middlewares/validateRegisterAliadosMiddleware.js");
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const aliadoAuthMiddleware = require("../middlewares/aliadoAuthMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// Formulario de login
router.get("/login", guestMiddleware, aliadosControllers.getLogin);

// Procesar el login
router.post("/login", aliadosControllers.loginAliado);

// Formulario de registro
router.get("/registerAliados", guestMiddleware, aliadosControllers.getRegisterAliados);


// Procesar el registroAliados
router.post(
  "/registerAliados",
  uploadFileAliado.any("fotoPerfil", "documentosLegales", "tituloProfesional"),
  validationsAliados,
 aliadosControllers.processRegisterAliados
);
// Perfil de usuario
router.get("/perfilAliado",aliadoAuthMiddleware, aliadosControllers.getAliadoProfile);


// Logout

router.get("/logout", authMiddleware, aliadosControllers.logout);

module.exports = router;


/*// Editar perfil aliado
router.get("/:id/editPerfilAliado", userControllers.getEditAliado);
router.put("/:id/editPerfilAliado", userControllers.uploadAliado);*/
