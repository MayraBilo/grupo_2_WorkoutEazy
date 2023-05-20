const path = require("path");

const controller = {
    getDetail: (req, res) => res.render("productDetail"),
    getCart: (req, res) => res.render("productCart"),
    getList: (req, res) => res.render("productList"),
    getListYoga: (req, res) => res.render("productListYoga"),
};

module.exports = controller;