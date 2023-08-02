const { validationResult } = require("express-validator");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const db = require("../database/models");

//uuid.v4()

//Cliente

const controller = {
  getLogin: (req, res) => {
    const error = req.query.error || "";

    res.render("login", { error });
  },

  //(req, res) => { res.render("login"); },

  processLogin: async (req, res) => {
    try {
      let userToLogin = await db.Cliente.findOne({
        where: { email: req.body.email },
      });

      if (userToLogin) {
        console.log(userToLogin);
        let isOkPass = bcrypt.compareSync(
          req.body.password,
          userToLogin.password
        );
        if (isOkPass) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;

          if (req.body.rememberUser) {
            res.cookie("userEmail", req.session.userLogged.email, { maxAge: 1000 * 600 });
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
    } catch (error) {
      return res.send("Hubo un error");
    }
  },

  getRegister: (req, res) => {
    res.render("register");
  },

  processRegister: async (req, res) => {
    try {
      const resultValidation = validationResult(req);

      if (resultValidation.errors.length > 0) {
        return res.render("register", {
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
        city: req.body.city,
        contact_number: req.body.contact_number,
        email: req.body.email,
        password: req.body.password,
        condiciones: req.body.condiciones,
        privacidad: req.body.privacidad,
      };

      const hashedPassword = bcrypt.hashSync(userData.password, 10);

      const userToCreate = {
        ...userData,
        password: hashedPassword,
      };

      await db.Cliente.create(userToCreate);

      res.redirect("/login");
    } catch (error) {
      res.json(error);
    }
  },
  getUpdateCliente: (req, res) => {
    db.Cliente.findByPk(req.params.id).then(function (cliente) {
      res.render("editPerfilCliente", { cliente: cliente });
    });
  },

  updateProfile: async (req, res) => {
    try {
      let cliente = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        city: req.body.city,
        avatar: req.file ? req.file.filename : req.body.file,
        contact_number: req.body.contact_number,
        email: req.body.email,
      };

      await db.Cliente.update(cliente, { where: { id: req.params.id } });

      return res.render("perfilCliente", { cliente: req.session.userLogged });
    } catch (error) {
      res.send("Hubo un error");
    }
  },
  updateAliado: async (req, res) => {
    try {
      let aliado = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        perfil_profesional: req.body.perfil_profesional,
        birth_date: req.body.birth_date,
        services_city: req.body.city,
        avatar: req.file ? req.file.filename : req.body.file,
        contact_number: req.body.contact_number,
        email: req.body.email,
      };

      await db.Aliado.update(aliado, { where: { id: req.params.id } });

      return res.render("perfilAliado", { aliado: req.session.userLogged });
    } catch (error) {
      res.send("Hubo un error");
    }
  },
  deleteProfile: (req, res) => {
    db.Cliente.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.redirect("/login");
  },

  clientProfile: (req, res) => {
    return res.render("perfilCliente", { cliente: req.session.userLogged });
  },

  logout: (req, res) => {
    console.log("logout cliente");
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = controller;
