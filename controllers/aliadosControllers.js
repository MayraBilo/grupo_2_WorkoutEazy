const path = require("path");

const { validationResult } = require("express-validator");
const fs = require("fs");
const cliente = require("../models/cliente");
const aliadoModel = require("../models/aliado");
const bcrypt = require("bcryptjs");
const { emitWarning } = require("process");

//usuarios//
const controller = {


    getLogin: (req, res) => {
      const error = req.query.error || '';
  
      res.render('login', {error});
  },

  loginAliado: (req, res) => {
    const searchedAliado = aliadoModel.findByEmail(req.body.email);

    
    if(!searchedAliado){
        return res.redirect('/login?error=El mail o la contraseña son incorrectos');
    }
    
    const {password: hashedPw} = searchedAliado;
    const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);
    
    if(isCorrect){
        if(!!req.body.remember){
            res.cookie('email', searchedAliado.email, {
                maxAge: 1000 * 60 * 60 * 24 * 360 * 9999
            });
        }

        delete searchedAliado.password;
        delete searchedAliado.id;

        req.session.aliado = searchedAliado;

        res.redirect('/');
    } else {
        return res.redirect('/login?error=El mail o la contraseña son incorrectos');
    }
},
    //Aliados//
    getRegisterAliados: (req, res) => { 
        res.cookie('testing', 'hola!', { maxAge: 1000 * 30 })
    res.render("registerAliados");
   },
  
    processRegisterAliados: (req, res) => {
      const resultValidation = validationResult(req);
  
      if (resultValidation.errors.length > 0) {
        return res.render("registerAliados", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
  
      let aliadoInDB = aliados.findByField("email", req.body.email);
  
      if (aliadoInDB) {
        return res.render("registerAliados", {
          errors: { email: { msg: "Este email ya está registrado" } },
          oldData: req.body,
        });
      }
  
      let aliadoToCreate = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        fotoPerfil: req.file.filename,
      };
  
      let aliadoCreated = aliado.create(aliadoToCreate);
      return res.redirect("/perfilAliado");
    },
    
    
    
    /*(req, res) => {
      const aliados = {
        ...req.body
      }
      const newPassword = bcrypt.hashSync(aliados.password, 12);
  
          aliados.password = newPassword;
  
          aliadoModel.createOne(aliados);
  
          
      return res.redirect("/perfilAliado");
    },*/

    
    //processRegisterAliado: (req, res) => {
      /*const resultValidation = validationResult(req);
  
      if (resultValidation.errors.length > 0) {
        return res.render("register", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
  
      let userInDB = aliado.findByEmail("email", req.body.email);
  
      if (userInDB) {
        return res.render("register", {
          errors: { email: { msg: "Este email ya está registrado" } },
          oldData: req.body,
        });
      }
  */
      //let userToCreate = {
        //...req.body,
        //password: bcrypt.hashSync(req.body.password, 10),
        //fotoPerfil: req.file.filename,
     // };
  
      //let userCreated = aliado.create(userToCreate);
     // return res.redirect("/login");
   // },
  
   
    logout: (req, res) => {
      /*res.clearCookie('userEmail')*/
      req.session.destroy();
      return res.redirect("/");
    },
  
    getAliadoProfile: (req, res) => {
      return res.render("perfilAliado", { aliado: req.session.aliadoLogged });
  
    } 
  
  }; 
  
  module.exports = controller;




  /*getEditAliado: (req, res) => {
    const id = Number(req.params.id);

    const perfilAActualizar = aliado.findById(id);

    if (!perfilAActualizar) {
      return res.send("error de id");
    }

    res.render("editPerfilAliado", {
      aliados: perfilAActualizar,
    });
  },
  uploadAliado: (req, res) => {
    const id = Number(req.params.id);
    const nuevosDatos = req.body;
    nuevosDatos.img = req.file ? req.file.filename : req.body.oldImage;

    aliado.updateById(id, nuevosDatos);

    res.redirect("/:id/perfilAliado");
  },*/
  