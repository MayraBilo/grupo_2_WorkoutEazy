const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes');
const userRoutes = require('./routes/userRoutes');
const aliadoRoutes = require('./routes/aliadoRoutes');

const app = express();

app.use(express.static(path.join(__dirname, "./public")));

app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname, "./views/main"),
    path.join(__dirname, "./views/productos"),
    path.join(__dirname, "./views/user"),
]);

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')


app.use(session({
    secret: "Shhh",
    resave: false,
    saveUninitialized: false,
}))

app.use(userLoggedMiddleware);


app.use(cookies());

// --- Middlewares ---
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//----routes----//
app.use(mainRoutes);
app.use('/product', productsRoutes);
app.use(userRoutes);
app.use(aliadoRoutes);

app.listen(3000, () => console.log("Servidor escuchando en el puerto http://localhost:3000/"));
