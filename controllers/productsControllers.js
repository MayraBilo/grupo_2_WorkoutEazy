const path = require("path");

const controller = {
    getDetail: (req, res) => res.render("productDetail"),
    getCart: (req, res) => res.render("productCart"),
    getCreate: (req, res) => res.render("createProduct"),
    getEdite: (req, res) => res.render("editeProduct"),
    getEdite: (req, res) => res.render("profileServices"),
};

module.exports = controller;