/* const { log } = require("console"); */
const express = require("express");
const path = require("path");

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
    app.set("views", [
        path.join(__dirname, "./views/main"),
        path.join(__dirname, "./views/productos"),
        path.join(__dirname, "./views/user"),
    ]);

app.use(mainRoutes);

app.use(productsRoutes);

app.use(userRoutes);


app.listen(3000, () => console.log("Servidor escuchando en el puerto 3000🚀"));
