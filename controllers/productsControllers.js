const path = require("path");

const controller = {
    getDetail: (req, res) => res.render("productDetail"),
    getCart: (req, res) => res.render("productCart"),
};

module.exports = controller;