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

  };

  const config = {
    tableName: "product",
    timestamps: false,
  };
  const Producto = sequelize.define(alias, cols, config);

  Producto.associate = function (models) {
    
    Producto.belongsToMany(models.Carrito, {
      through: models.ProductsCart,
      as: "carritos",
      foreignKey: "producto_id",

    });

Producto.belongsTo(models.Aliado, {
      as: "aliado_producto",
      foreignKey: "aliado_id",
    });
  };

  return Producto;
};
