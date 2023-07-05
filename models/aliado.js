const fs = require("fs");
const path = require("path");
const uuid = require('uuid');

const aliado = {
  // Ruta del archivo JSON
  route: '../data/aliados.json',

  // Traer todos los usuarios
  findAll: function () {
      const aliadosJSON = fs.readFileSync(path.join(__dirname, this.route), 'utf-8');

      const aliados = JSON.parse(aliadosJSON);

      return aliados;
  },

  // Traer un usuario según su email
  findByEmail: function (email) {

      let aliados = this.findAll();

      let searched = aliados.find(aliado => aliado.email === email);

      if (!searched) {
          searched = null;
      }

      return searched;
  },

  findByField: function (field, text) {
    let allUsers = this.findAll();
    let userFound = allUsers.find((oneUser) => oneUser[field] === text);
    return userFound;
  },

  // Agregar un usuario nuevo
  createOne: function (newAliado) {
      // Buscamos todos los usuarios
      let aliados = this.findAll();

      // Le damos el ID al usuario nuevo        
      newAliado.id = uuid.v4();

      // Agregamos el usuario nuevo al array original
      aliados.push(newAliado);

      // Convertimos a JSON el array
      const aliadosJSON = JSON.stringify(aliados);

      // Sobreescribimos el JSON
      fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);
  }
}

module.exports = aliado;

/*const aliado = {
  fileName: "./data/aliados.json",

  getData: function () {
    return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
  },

generateId: function () {
    let allAliados = this.findAll();
    let lastAliado = allAliados.pop();
    if (lastAliado) {
      return lastAliado.id + 1;
    }
    return 1;
  },

  findAll: function () {
    return this.getData();
  },

  findByPk: function (id) {
    let allAliados = this.findAll();
    let aliadoFound = allAliados.find((oneAliado) => oneAliado.id === id);
    return aliadoFound;
  },

  findByField: function (field, text) {
    let allAliados = this.findAll();
    let aliadoFound = allAliados.find((oneAliado) => oneAliado[field] === text);
    return aliadoFound;
  },
  /*createOne: function (aliadosData) {
    // Buscamos todos los usuarios
    let allAliados = this.findAll();

    // Le damos el ID al usuario nuevo        
    let newAliado = {
      id: this.generateId(),
      ...aliadosData,
    };

    // Agregamos el usuario nuevo al array original
    aliados.push(newAliado);

    // Convertimos a JSON el array
    const aliadosJSON = JSON.stringify(aliados);

    // Sobreescribimos el JSON
    fs.writeFileSync(path.join(__dirname, this.route), aliadosJSON);
}*/
 /* create: function (aliadosData) {
    let allAliados = this.findAll();
   
    let newAliado = {
      id: this.generateId(),
      ...aliadosData,
    };

    allAliados.push(newAliado);
    fs.writeFileSync(this.fileName, JSON.stringify(allAliados, null, " "));
    return newAliado;
  },

  delete: function (id) {

    let allAliados = this.findAll();
    let finalAliados = allAliados.filter((oneAliado) => oneAliado.id !== id);
    fs.writeFileSync(this.fileName, JSON.stringify(finalAliados, null, " "));

    return true;
  },
};


module.exports = aliado;

 

/*  findAll: function () {
    const aliadosJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );

    const aliados = JSON.parse(aliadosJSON);

    return aliados;
  },

  findByEmail: function (email) {
    const usersAliados = this.findAll();

    let searchedUser = usersAliados.find(
      (userAliado) => userAliado.identificacion === id
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


  updateById: function (id, newData) {
    let usersAliados = this.findAll();

    const indice = usersAliados.findIndex(
      (userAliadoActual) => userAliadoActual.id === id
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
  



