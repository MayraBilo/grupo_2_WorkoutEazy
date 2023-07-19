const path = require("path");

const controller = {
    getIndex: (req, res) => res.render("index"),

    getBlog: (req, res) => res.render("blog"),
};

module.exports = controller;