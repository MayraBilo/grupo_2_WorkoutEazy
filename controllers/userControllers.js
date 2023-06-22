const path = require("path");

const user = require('../models/cliente');

const bcrypt = require('bcryptjs');

const controller = {
    getLogin: (req, res) => res.render("login"),
    getRegister: (req, res) => res.render("register"),

    processRegister: (req, res) => {

        /*const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let userInDB = user.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {email: {msg: 'Este email ya está registrado'}},
                oldData: req.body})
        }*/

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = user.create(userToCreate);
        return res.redirect('/login')
},

    getRegisterAliados: (req, res) => res.render("registerAliados"),
    clientProfile: (req, res) => res.render("perfilCliente"),
    getAliadoProfile: (req, res) => res.render("perfilAliado"),
};

module.exports = controller;
