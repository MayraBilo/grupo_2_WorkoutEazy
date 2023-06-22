const path = require("path");

const controller = {
    getLogin: (req, res) => res.render("login"),
    getRegister: (req, res) => res.render("register"),
    getRegisterAliados: (req, res) => res.render("registerAliados"),
    clientProfile: (req, res) => res.render("perfilCliente"),
    getAliadoProfile: (req, res) => res.render("perfilAliado"),
};

module.exports = controller;
