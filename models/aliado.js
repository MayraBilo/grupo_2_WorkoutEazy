const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const model = {
  route: "../data/aliados.json",

  findAll: function () {
    const aliadosJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );

    const aliados = JSON.parse(aliadosJSON);

    return aliados;
  },

  findByEmail: function (email) {
    const aliados = this.findAll();

    let searchedAliado = aliados.find(
      (aliados) => aliados.email === email
    );

    if (!searchedAliado) {
      searchedAliado = null;
    }
    return searchedAliado;
  },
  //REVISAR
  //deleteById: function (id) {
    //let aliados = this.findAll();

    //aliados = aliados.filter((aliado) => aliado.id !== id);

    //const aliadosJSON = JSON.stringify(aliados);

    //fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);

    //return aliados;


  updateById: function (email, newData) {
    let aliados = this.findAll();

    const indice = aliados.findIndex(
      (aliadoActual) => aliadoActual.email === email
    );

    aliados[indice].perfilUsuario = newData.perfilUsuario;
    aliados[indice].nombreEmpresa = newData.nombreEmpresa;
    aliados[indice].nombreProfesional = newData.nombreProfesional;
    aliados[indice].apellidoProfesional = newData.apellidoProfesional;
    aliados[indice].profesionServicio = newData.profesionServicio;
    aliados[indice].sexo = newData.sexo;
    aliados[indice].tipoIdentificacion = newData.tipoIdentificacion;
    usersAliados[indice].numeroIdentificacion = newData.numeroIdentificacion;
    usersAliados[indice].fechaNacimiento = newData.fechaNacimiento;
    usersAliados[indice].ciudadResidencia = newData.ciudadResidencia;
    usersAliados[indice].celular = newData.celular;
    usersAliados[indice].email = newData.email;
    usersAliados[indice].fotoPerfil = newData.fotoPerfil;
    usersAliados[indice].documentosLegales = newData.documentosLegales;
    usersAliados[indice].tituloProfesional = newData.tituloProfesional;
    usersAliados[indice].password = newData.password;
    usersAliados[indice].confirmarContrasena = newData.confirmarContrasena;
    usersAliados[indice].terminosCondiciones = newData.terminosCondiciones;

    const usersAliadosJSON = JSON.stringify(usersAliados);

    fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);

    return aliados;
  },

  createOne: function (newAliado) {
    let aliados = this.findAll();

    newAliado.id = uuid.v4();

    aliados.push(newAliado);

    const aliadosJSON = JSON.stringify(aliados);

    fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);
  }
}

module.exports = model;
  
  /*create: function (newAliado) {
      createOne: function (newUser) {
    let users = this.findAll();

    newUser.id = uuid.v4();

    users.push(newUser);

    const usersJSON = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
  },
    let aliados = this.findAll();

    newAliado.id = aliados[aliados.length - 1].id + 1;

    aliados.push(newAlido);

    const aliadosJSON = JSON.stringify(aliados);

    fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);
  },
    //*let allUsers = this.findAll();
    //let newAliado = {
      //id: (aliadoData.id = uuid.v4()),
     // ...aliadoData,
    //};
   // allUsers.push(newAliado);
    //fs.writeFileSync(
     // path.join(__dirname, this.route),
     // JSON.stringify(allUsers, null, " ")
    //);
    //return newAliado;*/
  



