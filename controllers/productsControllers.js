const path = require("path");

const controller = {
    getDetail: (req, res) => res.render("productDetail"),
    getCart: (req, res) => res.render("productCart"),
    getCreate: (req, res) => res.render("createProduct"),
    getEdite: (req, res) => res.render("editeProduct"),
    getService: (req, res) => res.render("profileServices"),
    getList: (req, res) => res.render("productList"),
    getListYoga: (req, res) => res.render("productListYoga"),
    getListFitness: (req, res) => res.render("productListFitness"),
    getListDeportes: (req, res) => res.render("productListDeportes"),
    getListDanzas: (req, res) => res.render("productListDanzas"),
};

module.exports = controller;