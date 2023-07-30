module.exports = (sequelize, dataTypes) => {
  const alias = "Producto";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activity_name: {
      type: dataTypes.STRING,
    },
    aliado_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "aliado",
        key: "id",
      },
    },
    category: {
      type: dataTypes.STRING,
    },
    subcategory: {
      type: dataTypes.STRING,
    },
    product_description: {
      type: dataTypes.STRING,
    },
    price: {
      type: dataTypes.DOUBLE,
    },
    discount: {
      type: dataTypes.INTEGER,
    },
    spots: {
      type: dataTypes.INTEGER,
    },
    schedule: {
      type: dataTypes.DATE,
    },
    length: {
      type: dataTypes.TIME,
    },
    image: {
      type: dataTypes.STRING,
    },
    difficulty: {
      type: dataTypes.STRING,
    },
    adress: {
      type: dataTypes.STRING,
    },
    city: {
      type: dataTypes.STRING,
    },
    age: {
      type: dataTypes.STRING,
    },
    mode: {
      type: dataTypes.STRING,
    },
    cliente_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "cliente",
        key: "id",
      },
    },
    carrito_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "shopping_cart",
        key: "id",
      },
    },
  };

  const config = {
    tableName: "product",
    timestamps: false,
  };
  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = function (models) {
    // relación OK
    Producto.belongsToMany(models.Carrito, {
      as: "carrito",
      foreignKey: "carrito_id",
      through: "carrito_producto",
      timestamps: false,
    });

    Producto.belongsTo(models.Aliado, {
      as: "aliado_producto",
      foreignKey: "aliado_id",
    });

    Producto.belongsToMany(models.Cliente, {
      as: "producto_cliente",
      foreignKey: "cliente_id",
      otherKey: "product_id",
      through: "cliente_producto",
      timestamps: false,
    });
  };

  return Producto;
};
