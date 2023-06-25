const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const model = {
  route: "../data/usuarios.json",

  findAll: function () {
    const usersJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );
    const users = JSON.parse(usersJSON);

    return users;
  },

  findById: function (email) {
    const users = this.findAll();

    let searchedUser = users.find((user) => user.email === email);

    if (!searchedUser) {
      searchedUser = null;
    }
    return searchedUser;
  },
  //REVISAR
  deleteById: function (id) {
    let users = this.findAll();

    users = users.filter((user) => user.id !== id);

    const usersJSON = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

    return users;
  },

  updateById: function (email, newData) {
    let users = this.findAll();

    const indice = users.findIndex((userActual) => userActual.email === email);
    //MODIFICAR SEGUN FORM USUARIO
    users[indice].categoria = newData.categoria;
    users[indice].subcategoria = newData.subcategoria;
    users[indice].img = newData.img;
    users[indice].nombreActividad = newData.nombreActividad;
    users[indice].nombreAliado = newData.nombreAliado;
    users[indice].dificultad = newData.dificultad;
    users[indice].edadesAlumnos = newData.edadesAlumnos;
    users[indice].valor = newData.valor;
    users[indice].cupos = newData.cupos;
    users[indice].descripcion = newData.descripcion;
    users[indice].direccion = newData.direccion;
    users[indice].ciudad = newData.ciudad;
    users[indice].horarios = newData.horarios;
    users[indice].duracion = newData.duracion;
    users[indice].presencial = newData.presencial;
    users[indice].modalidad = newData.modalidad;

    const usersJSON = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);

    return users;
  },
  createOne: function (newUser) {
    let users = this.findAll();

    newUser.id = uuid.v4();

    users.push(newUser);

    const usersJSON = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, this.route), usersJSON);
  },
};

module.exports = model;
