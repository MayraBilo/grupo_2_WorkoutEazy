const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const model = {
  route: "../data/aliados.json",

  findAll: function () {
    const usersAliadosJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );
    const usersAliados = JSON.parse(usersAliadosJSON);

    return usersAliados;
  },

  findById: function (email) {
    const usersAliados = this.findAll();

    let searchedUser = usersAliados.find(
      (userAliado) => userAliado.email === email
    );

    if (!searchedUser) {
      searchedUser = null;
    }
    return searchedUser;
  },
  //REVISAR
  deleteById: function (id) {
    let usersAliados = this.findAll();

    usersAliados = usersAliados.filter((userAliado) => userAliado.id !== id);

    const usersAliadosJSON = JSON.stringify(usersAliados);

    fs.writeFileSync(path.join(__dirname, this.route), usersAliadosJSON);

    return usersAliados;
  },

  updateById: function (email, newData) {
    let usersAliados = this.findAll();

    const indice = usersAliados.findIndex(
      (userAliadoActual) => userAliadoActual.email === email
    );
    //MODIFICAR SEGUN FORM ALIADOS
    usersAliados[indice].categoria = newData.categoria;
    usersAliados[indice].subcategoria = newData.subcategoria;
    usersAliados[indice].img = newData.img;
    usersAliados[indice].nombreActividad = newData.nombreActividad;
    usersAliados[indice].nombreAliado = newData.nombreAliado;
    usersAliados[indice].dificultad = newData.dificultad;
    usersAliados[indice].edadesAlumnos = newData.edadesAlumnos;
    usersAliados[indice].valor = newData.valor;
    usersAliados[indice].cupos = newData.cupos;
    usersAliados[indice].descripcion = newData.descripcion;
    usersAliados[indice].direccion = newData.direccion;
    usersAliados[indice].ciudad = newData.ciudad;
    usersAliados[indice].horarios = newData.horarios;
    usersAliados[indice].duracion = newData.duracion;
    usersAliados[indice].presencial = newData.presencial;
    usersAliados[indice].modalidad = newData.modalidad;

    const usersAliadosJSON = JSON.stringify(usersAliados);

    fs.writeFileSync(path.join(__dirname, this.route), usersAliadosJSON);

    return usersAliados;
  },
  createOne: function (newUserAliado) {
    let usersAliados = this.findAll();

    newUserAliado.id = uuid.v4();

    usersAliados.push(newUser);

    const usersAliadosJSON = JSON.stringify(usersAliados);

    fs.writeFileSync(path.join(__dirname, this.route), usersAliadosJSON);
  },
};

module.exports = model;
