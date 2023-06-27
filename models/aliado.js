const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const aliado = {
  route: "../data/aliados.json",

  findAll: function () {
    const usersAliadosJSON = fs.readFileSync(
      path.join(__dirname, this.route),
      "utf-8"
    );

    const usersAliados = JSON.parse(usersAliadosJSON);

    return usersAliados;
  },

  findById: function (id) {
    const usersAliados = this.findAll();

    let searchedUser = usersAliados.find(
      (userAliado) => userAliado.identificacion === id
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

  updateById: function (id, newData) {
    let usersAliados = this.findAll();

    const indice = usersAliados.findIndex(
      (userAliadoActual) => userAliadoActual.id === id
    );

    usersAliados[indice].perfilUsuario = newData.perfilUsuario;
    usersAliados[indice].nombreEmpresa = newData.nombreEmpresa;
    usersAliados[indice].nombreProfesional = newData.nombreProfesional;
    usersAliados[indice].apellidoProfesional = newData.apellidoProfesional;
    usersAliados[indice].profesionServicio = newData.profesionServicio;
    usersAliados[indice].sexo = newData.sexo;
    usersAliados[indice].tipoIdentificacion = newData.tipoIdentificacion;
    usersAliados[indice].numeroIdentificacion = newData.numeroIdentificacion;
    usersAliados[indice].fechaExpedicion = newData.fechaExpedicion;
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

    fs.writeFileSync(path.join(__dirname, this.route), usersAliadosJSON);

    return usersAliados;
  },
  create: function (aliadoData) {
    let allUsers = this.findAll();
    let newAliado = {
      id: (aliadoData.id = uuid.v4()),
      ...aliadoData,
    };
    allUsers.push(newAliado);
    fs.writeFileSync(
      path.join(__dirname, this.route),
      JSON.stringify(allUsers, null, " ")
    );
    return newAliado;
  },
};

module.exports = aliado;
