const path = require("path");

const controller = {
    getIndex: (req, res) =>
    res.sendFile(path.join(__dirname, "../views/user/index.html"))
};

module.exports = controller;