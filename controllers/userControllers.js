const path = require("path");

const controller = {
    getLogin: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/user/login.html")),
    getRegister: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/user/register.html"))
};

module.exports = controller;