const path = require("path");

const { validationResult } = require("express-validator");
const fs = require("fs");
const cliente = require("../models/cliente");
const aliado = require("../models/aliado");
const bcrypt = require("bcryptjs");
const { emitWarning } = require("process");

const controller = {
  getLogin: (req, res) => res.render("login"),

  processLogin: (req, res) => {
    let userToLogin = cliente.findByField("email", req.body.email);

    if (userToLogin) {
      let isOkPass = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkPass) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.rememberUser) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 600 });
        }

        return res.redirect("/perfilCliente");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "No se encuentra este email",
        },
      },
    });
  },

  getRegister: (req, res) => {
    /*res.cookie('testing', 'hola!', { maxAge: 1000 * 30 })*/
    res.render("register");
  },

  processRegister: (req, res) => {
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = cliente.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: { email: { msg: "Este email ya está registrado" } },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    let userCreated = cliente.create(userToCreate);
    return res.redirect("/login");
  },
  processRegisterAliado: (req, res) => {
    /*const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = aliado.findByEmail("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: { email: { msg: "Este email ya está registrado" } },
        oldData: req.body,
      });
    }
*/
    let userToCreate = {
      ...req.body,
      //password: bcrypt.hashSync(req.body.password, 10),
      //fotoPerfil: req.file.filename,
    };

    let userCreated = aliado.create(userToCreate);
    return res.redirect("/login");
  },

  getRegisterAliados: (req, res) => res.render("registerAliados"),

  getEditAliado: (req, res) => {
    const id = Number(req.params.id);

    const perfilAActualizar = aliado.findById(id);

    if (!perfilAActualizar) {
      return res.send("error de id");
    }

    res.render("editPerfilAliado", {
      aliados: perfilAActualizar,
    });
  },
  uploadAliado: (req, res) => {
    const id = Number(req.params.id);
    const nuevosDatos = req.body;
    nuevosDatos.img = req.file ? req.file.filename : req.body.oldImage;

    aliado.updateById(id, nuevosDatos);

    res.redirect("/:id/perfilAliado");
  },

  clientProfile: (req, res) => {
    /*console.log(req.cookies.userEmail);*/
    return res.render("perfilCliente", { cliente: req.session.userLogged });
  },

  logout: (req, res) => {
    /*res.clearCookie('userEmail')*/
    req.session.destroy();
    return res.redirect("/");
  },

  getAliadoProfile: (req, res) => {
    const id = Number(req.params.id);

    const perfilAMostrar = aliado.findById(id);

    if (!perfilAMostrar) {
      return res.send("error de id");
    }

    res.render("perfilAliado", { aliados: perfilAMostrar });
  },
};

module.exports = controller;
