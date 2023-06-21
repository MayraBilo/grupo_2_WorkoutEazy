const path = require("path");

const controller = {
  getLogin: (req, res) => res.render("login"),
  getRegister: (req, res) => res.render("register"),
  getRegisterAliados: (req, res) => res.render("registerAliados"),
  postLogin: (req, res) => {
    console.log("acá va a ir el código para el post login");
  },
  postRegister: (req, res) => {
    console.log("acá va a ir el código para el post register");
  },
  postRegisterAliados: (req, res) => {
    console.log("acá va a ir el código para el post registerAliados");
  },
};

module.exports = controller;
