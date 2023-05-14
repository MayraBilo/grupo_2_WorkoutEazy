const { log } = require("console");
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/user/index.html"))
);

app.get("/productDetail", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/productos/productDetail.html"))
);

app.get("/productCart", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/productos/productCart.html"))
);

app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/user/register.html"))
);

app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "./views/user/login.html"))
);

app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000🚀"));
