module.exports = (sequelize, dataTypes) => {
    const alias = "ProductsCart";

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          
        carrito_id: {
            type: dataTypes.INTEGER,
            references: {
                model: "Carrito",
                key: "id",
            },
        },
        producto_id: {
            type: dataTypes.INTEGER,
            references: {
                model: "Product",
                key: "id",
            },
        },

    };

    const config = {
        tableName: "productsCart",
        timestamps: false,
    };

    const ProductsCart = sequelize.define(alias, cols, config);

    ProductsCart.associate = function (models) {
        ProductsCart.belongsTo(models.Carrito, {
            as: "carrito",
            foreignKey: "carrito_id", 
        });

        ProductsCart.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "producto_id", 
        });
    };

    return ProductsCart;
};