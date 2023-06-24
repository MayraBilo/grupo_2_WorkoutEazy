const path = require("path");

const { validationResult } = require ('express-validator');

const cliente = require('../models/cliente');

const bcrypt = require('bcryptjs');

const controller = {
    getLogin: (req, res) => res.render("login"),

    processLogin: (req, res) => {

        let userToLogin = cliente.findByField('email', req.body.email);

        if (userToLogin){
            let isOkPass = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (isOkPass) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                /*if(req.body.rememberUser){
                    res.cookie('userEmail', req.body.email, { maxAge: 1000 * 600 })
                }*/

                return res.redirect('/perfilCliente')
            }
            return res.render('login', {
                errors: {
                    email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
            });

        }
        
        return res.render('login', {
            errors: {
                email: {
                msg: 'No se encuentra este email'
            }
        }
        });
    },

    getRegister: (req, res) => res.render("register"),

    processRegister: (req, res) => {

        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let userInDB = cliente.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {email: {msg: 'Este email ya está registrado'}},
                oldData: req.body})
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = cliente.create(userToCreate);
        return res.redirect('/login')
},

    getRegisterAliados: (req, res) => res.render("registerAliados"),

    clientProfile: (req, res) => {
    return res.render("perfilCliente", {cliente: req.session.userLogged})},

    logout: (req, res) => {
        /*res.clearCookie('userEmail')*/
        req.session.destroy();
        return res.redirect('/');
    },

    getAliadoProfile: (req, res) => res.render("perfilAliado"),
};

module.exports = controller;
