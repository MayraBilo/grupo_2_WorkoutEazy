module.exports = (sequelize, dataTypes) => {
  const alias = "Carrito";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    cliente_id: {
      type: dataTypes.INTEGER,
      references: {
        model: "cliente",
        key: "id",
      },
    },
    
  };

  const config = {
    tableName: "shopping_cart",
    timestamps: false,
  };
  const Carrito = sequelize.define(alias, cols, config);

  Carrito.associate = function (models) {
    
    Carrito.belongsToMany(models.Producto, {
      through: models.ProductsCart,
      as: "products",
      foreignKey: "carrito_id",
    });
    
    Carrito.belongsTo(models.Cliente, {
      as: "cliente",
      foreignKey: "cliente_id",
    });
  };

  return Carrito;
};
