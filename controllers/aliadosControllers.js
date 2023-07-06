
const fs = require("fs");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const aliado = require("../models/aliado");


const controller = {

    getRegisterAliados: (req, res) => {
        res.render('registerAliados');
    },

    registerAliados: (req, res) => {

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("registerAliados", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = aliado.findByField("email", req.body.email);

    if (userInDB) {
      return res.render("registerAliados", {
        errors: { email: { msg: "Este email ya está registrado" } },
        oldData: req.body,
      });
    }

    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      fotoPerfil: req.file.filename,
    };

    let userCreated = aliado.createOne(userToCreate);
    return res.redirect("/loginAliado");

    },
    
    getLoginAliado: (req, res) => {
        const error = req.query.error || '';

        res.render('loginAliado', {error});
    },
    
    loginAliado: (req, res) => {
        const userToLogin = aliado.findByField("email", req.body.email);
        console.log("hola aca estoy")
        if (userToLogin) {
          console.log("usuario encontrado")
          let isOkPass = bcrypt.compareSync(
            req.body.password,
            userToLogin.password
          );
          if (isOkPass) {
            console.log("password coincide")
            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if (req.body.rememberUser) {
              res.cookie("userEmail", req.body.email, { maxAge: 1000 * 600 });
            }
    
            return res.redirect("/perfilAliado");
          }

          return res.render("loginAliado", {
            errors: {
              email: {
                msg: "Las credenciales son inválidas",
              },
            },
          });

        }
    
        return res.render("loginAliado", {
          errors: {
            email: {
              msg: "No se encuentra este email",
            },
          },
        }); 

    },

    getAliadoProfile: (req, res) => {
      /*console.log(req.cookies.userEmail);*/
      return res.render("perfilAliado", {aliado: req.session.userLogged});
},

logoutAliado: (req, res) => {
  console.log('logoutaliado')
  res.clearCookie('userEmail')
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
  