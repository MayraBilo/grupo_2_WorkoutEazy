module.exports = (sequelize, dataTypes) => {
  const alias = "Cliente";

  const cols = {
    id: {
      type: dataTypes.STRING,
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
    image: {
      type: dataTypes.STRING,
    },
    product_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "product",
        key: "id",
      }
    },
    shopping_cart_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "shopping_cart",
        key: "id",
      }
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
    }
  };

  const config = {
    tableName: "cliente",
    timeStamps: false,
  };

  const Cliente = sequelize.define(alias, cols, config);

  Cliente.associate = function (models) {
    // Relación OK
    Cliente.belongsToMany(models.Producto, {
      as: "producto_cliente",
      foreignKey: "product_id",
      through: "cliente_producto"
    })

    // Relación OK
    Cliente.belongsTo(models.Carrito, {
      as: "cliente_carrito",
      foreignKey: "shopping_cart_id"
    })
  }
  return Cliente;
};

