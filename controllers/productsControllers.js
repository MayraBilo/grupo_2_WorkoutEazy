const path = require("path");

const controller = {
    getDetail: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/productos/productDetail.html")),
    getCart: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/productos/productCart.html"))
};

module.exports = controller;