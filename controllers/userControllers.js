const { validationResult } = require("express-validator");
const fs = require("fs");
const cliente = require("../models/cliente");
const bcrypt = require("bcryptjs");

const db = require("../database/models");
const uuid = require("uuid");

//Cliente 

const controller = {

  getLogin: (req, res) => {
    const error = req.query.error || '';

    res.render('login', {error});
},

   //(req, res) => { res.render("login"); },
  
  processLogin: async (req, res) => {

    try{

    let userToLogin = await db.Cliente.findOne({
      where: {email: req.body.email}
    });

    if (userToLogin) {
      let isOkPass = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkPass) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;

        if (req.body.rememberUser) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 600 });
        }

        return res.redirect("/perfilCliente");
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

  }catch(error){
    return res.send('Hubo un error');
  }
  },
 

  getRegister: (req, res) => {
   res.render("register");
  },

  processRegister: async (req, res) => {

    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }

    try {
      const userData = req.body;
      
      console.log(userData)

      const hashedPassword = bcrypt.hashSync(userData.password, 10);

      const userToCreate = {
        ...userData,
        password: hashedPassword
      }

      console.log(userToCreate)

      await db.Cliente.create(userToCreate)
     
      return res.redirect("/login")

    } catch(error){
      res.send('Hubo un error')
    }


    /*
    try{

    let userInDB = db.Cliente.findAll({
      where: {
        email: req.body.email
      }});

    if (userInDB) {
      return res.render("register", {
        errors: { email: { msg: "Este email ya está registrado" } },
        oldData: req.body,
      });
    }

    let userToCreate = await {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };

    let userCreated = db.Cliente.create(userToCreate);

    return res.redirect("/login");

  } catch (error){
    res.send('Hubo un error')
  }*/

  },

  clientProfile: (req, res) => {
    /*console.log(req.cookies.userEmail);*/
    return res.render("perfilCliente", { cliente: req.session.userLogged });
  },

  logout: (req, res) => {
    console.log('logout cliente')
    res.clearCookie('userEmail')
    req.session.destroy();
    return res.redirect("/");
  },

};

module.exports = controller;

//Sequelize

/*

const { validationResult } = require("express-validator");
const fs = require("fs");
const Cliente = require("../database/models/Cliente");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const controller = {

  getRegister: async (req, res) => {
    res.render("register");
  },

  updateCliente: async (req, res) => {
    try {
      const clienteAEditar = await Cliente.findByPk(req.params.id)
      res.render("/editPerfilCliente", {clienteAEditar})
    } catch(error) {
      res.send("hubo un error")
    }
  }, 
  create: async (req, res) => {
    const nuevoCliente = {
      id: uuid.v4(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      genre: req.body.genre,
      birth_date: req.body.birth_date,
      city: req.body.city,
      contact_number: req.body.contact_number,
      email: req.body.email,
      image: req.body.image,
      password: req.body.password,
    };
    try {
      const datos = await Cliente.create(nuevoCliente);
    } catch (error) {
      res.send("Ha habido un error");
    }
    res.redirect("/login");
  },

  update: async (req, res) => {
    const newData = req.body
    try {
      await Cliente.update(newData, { where: { id: req.params.id } })
      res.redirect("/perfilCliente")
    } catch (error) {
      res.send("Hubo un error")
    }
  },
}

*/

