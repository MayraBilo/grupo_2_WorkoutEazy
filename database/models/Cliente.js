module.exports = (sequelize, dataTypes) => {
  const alias = "Cliente";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: dataTypes.STRING,
    },
    birth_date: {
      type: dataTypes.DATE,
    },
    city: {
      type: dataTypes.STRING,
    },
    contact_number: {
      type: dataTypes.INTEGER,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: dataTypes.STRING,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    condiciones: {
      type: dataTypes.STRING,
    },
    privacidad: {
      type: dataTypes.STRING,
    },
  };

  const config = {
    tableName: "cliente",
    timestamps: false,
  };

  const Cliente = sequelize.define(alias, cols, config);

    Cliente.associate = function (models) {
    
         Cliente.hasMany(models.Carrito, {
           as: "carritos",
           foreignKey: "cliente_id", 
         });
      };

  return Cliente;
};
