const fs = require("fs");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const db = require("../database/models");
const uuid = require("uuid");

const controller = {
  getRegisterAliados: (req, res) => {
    res.render("registerAliados");
  },

  registerAliados: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        return res.render("registerAliados", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }

      const userData = {
        avatar: req.file ? req.file.filename : "sin foto",
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        genre: req.body.genre,
        birth_date: req.body.birth_date,
        services_city: req.body.services_city,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: req.body.password,
        condiciones: req.body.condiciones,
        privacidad: req.body.privacidad,
        document: req.body.document,
        document_number: req.body.document_number,
        entity_name: req.body.entity_name,
        aliado_profile: req.body.aliado_profile,
        services: req.body.services,
      };

      const hashedPassword = bcrypt.hashSync(userData.password, 10);

      const userToCreate = {
        ...userData,
        password: hashedPassword,
      };

      await db.Aliado.create(userToCreate);

      res.redirect("/loginAliado");
    } catch (error) {
      res.json(error);
    }
  },

  getLoginAliado: (req, res) => {
    const error = req.query.error || "";

    res.render("loginAliado", { error });
  },

  loginAliado: async (req, res) => {
    try {
      let userToLogin = await db.Aliado.findOne({
        where: { email: req.body.email },
      });

      if (userToLogin) {
        console.log(userToLogin.rol);
        let isOkPass = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (isOkPass) {
          console.log("password coincide");
          delete userToLogin.password;
          req.session.userLogged = userToLogin;

          if (req.body.rememberUser) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 600 });
          }

          return res.redirect("/perfilAliado");
        }

        return res.render("loginAliado", {
          errors: {
            email: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }

      return res.render("loginAliado", {
        errors: {
          email: {
            msg: "No se encuentra este email",
          },
        },
      });
    } catch (error) {
      return res.json(error);
    }
  },

  getAliadoProfile: (req, res) => {
    /*console.log(req.cookies.userEmail);*/
    return res.render("perfilAliado", { aliado: req.session.userLogged });
  },
  getUpdateAliado: (req, res) => {
    return res.render("editPerfilAliado", { aliado: req.session.userLogged });
  },

  logoutAliado: (req, res) => {
    console.log("logoutaliado");
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/loginAliado");
  },
};

module.exports = controller;

