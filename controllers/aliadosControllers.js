const aliadoModel = require('../models/aliado.js');
const fs = require("fs");

const bcrypt = require("bcryptjs");


const controller = {
    /*signOut: (req, res) => {
        res.clearCookie('email');

        req.session.aliado = {};

        res.redirect('/loginAliado');
    },*/

    getRegisterAliados: (req, res) => {
        res.render('registerAliados');
    },

    registerAliados: (req, res) => {
        const aliados = {
            ...req.body
        };

        const newPassword = bcrypt.hashSync(aliados.password, 12);

       aliados.password = newPassword;

        aliadoModel.createOne(aliados);


        return res.redirect("/loginAliado");

       // res.send('Se registró el usuario');
    },

    getLoginAliado: (req, res) => {
        const error = req.query.error || '';

        res.render('loginAliado', {error});
    },
    
    loginAliado: (req, res) => {
        const searchedAliado = aliadoModel.findByEmail(req.body.email);
       
        
        if(!searchedAliado){
            return res.redirect('/loginAliado?error=El mail o la contraseña son incorrectos');
        }
        
        const {password: hashedPw} = searchedAliado;
        const isCorrect = bcrypt.compareSync(req.body.password, hashedPw);
        
        if(isCorrect){
            if(!!req.body.remember){
                res.cookie('email', searchedAliado.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 360 * 9999
                });
                res.sed("se inicio sesion Aliado");
            }

            delete searchedAliado.password;
            delete searchedAliado.id;

            req.session.Aliado = searchedAliado;

            res.redirect('/perfilAliado');
        } else {
            return res.redirect('/loginAliado?error=El mail o la contraseña son incorrectos');
        }

    },

    getAliadoProfile: (req, res) => {
      /*console.log(req.cookies.userEmail);*/
      return res.render("perfilAliado");
},

logoutAliado: (req, res) => {
  /*res.clearCookie('userEmail')*/
  req.session.destroy();
  return res.redirect("/loginAliado");
},

}

module.exports = controller;




/*const path = require("path");
const { validationResult } = require("express-validator");
const fs = require("fs");
const aliadoModel = require("../models/aliado");
const bcrypt = require("bcryptjs");
const { emitWarning } = require("process");

const controller = {

  getLogin: (req, res) => {
    const error = req.query.error || '';

    res.render('login', {error});
  },

  processLogin: (req, res) => {
    let aliadoToLogin = aliado.findByField("email", req.body.email);

    if (aliadoToLogin) {
      let isOkPass = bcrypt.compareSync(
        req.body.password,
        aliadoToLogin.password
      );
      if (isOkPass) {
        delete aliadoToLogin.password;
        req.session.aliadoLogged = aliadoToLogin;

        if (req.body.rememberUser) {
          res.cookie("aliadoEmail", req.body.email, { maxAge: 1000 * 600 });
        }

        return res.redirect("/perfilAliado");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render("login", {
      errors: {
        email: {
          msg: "No se encuentra este email",
        },
      },
    });
  },
 

getRegisterAliados: (req, res) => { 
        res.cookie('testing', 'hola!', { maxAge: 1000 * 30 })
    res.render("registerAliados");
   },

   registerAliados: (req, res) => {
    const aliado = {
        ...req.body
    };

    const newPassword = bcrypt.hashSync(aliado.password, 12);

    aliado.password = newPassword;

    aliadoModel.create(aliado);

    res.send('Se registró el usuario');
},

/*processRegisterAliados: (req, res) => {
      const resultValidation = validationResult(req);
  
      if (resultValidation.errors.length > 0) {
        return res.render("registerAliados", {
          errors: resultValidation.mapped(),
          oldData: req.body,
        });
      }
  
      let aliadoInDB = aliado.findByField("email", req.body.email);
  
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
      return res.redirect("/login");
    },*/

  
    
    /*getAliadoProfile: (req, res) => {
      return res.render("perfilAliado", { aliado: req.session.aliadoLogged });
  
    },
  
   
    logout: (req, res) => {
      /*res.clearCookie('userEmail')*/
      //req.session.destroy();
     // return res.redirect("/");
    
  
  
  


  //module.exports = controller;*/




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
  