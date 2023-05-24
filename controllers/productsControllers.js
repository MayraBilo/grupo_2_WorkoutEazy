const path = require("path");

const controller = {
    getDetail: (req, res) => res.render("productDetail"),
    getCart: (req, res) => res.render("productCart"),
    getCreate: (req, res) => res.render("createProduct"),
    getEdite: (req, res) => res.render("editeProduct"),
    getEdite: (req, res) => res.render("profileServices"),
    getList: (req, res) => res.render("productList"),
    getListYoga: (req, res) => res.render("productListYoga"),
    getListFitness: (req, res) => res.render("productListFitness"),
    getListMontana: (req, res) => res.render("productListMontana"),
    getListBaile: (req, res) => res.render("productListBaile"),
    getListFootball: (req, res) => res.render("productListFootball"),
    getListTennis: (req, res) => res.render("productListTennis"),
};

module.exports = controller;