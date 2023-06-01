const path = require("path");
const fs = require("fs")
const productFilePath = path.join(__dirname, "../data/products.json");
const products = JSON.parse(fs.readFileSync(productFilePath, "utf-8"));

const controller = {
    getList: (req, res) => {
        res.render("productList", {
            products: products,
        })},
    getDetail: (req, res) => {
        res.render("productDetail")},
    getCart: (req, res) => {
        res.render("productCart")},
    getCreate: (req, res) => {
        res.render("createProduct")},
    getEdite: (req, res) => {
        res.render("editeProduct")},
    getService: (req, res) => {
        res.render("profileServices")},
    getListYoga: (req, res) => {
        res.render("productListYoga")},
    getListFitness: (req, res) => {
        res.render("productListFitness")},
    getListDeportes: (req, res) => {
        res.render("productListDeportes")},
    getListDanzas: (req, res) => {
        res.render("productListDanzas")},
};

module.exports = controller;