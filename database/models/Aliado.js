module.exports = (sequelize, dataTypes) => {
  const alias = "Aliado";

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
    aliado_profile: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    entity_name: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: dataTypes.STRING,
    },
    services: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    document_number: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    birth_date: {
      type: dataTypes.DATE,
    },
    services_city: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    contact_number: {
      type: dataTypes.INTEGER,
      allowNull: false,
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
    rol: {
      type: dataTypes.STRING,
    },
    product_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "product",
        key: "id"
      }
    }
  };

  const config = {
    tableName: "aliado",
    timestamps: false,
  };

  const Aliado = sequelize.define(alias, cols, config);

  Aliado.associate = function (models) {
    Aliado.hasMany(models.Producto, {
      as: "productos",
      foreignKey: "aliado_id"
    });
  };

  return Aliado;
};
