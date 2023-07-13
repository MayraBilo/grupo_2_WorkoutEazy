module.exports = (sequelize, dataTypes) => {
    const alias = 'Carrito';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: dataTypes.INTEGER    
        },
        quantity: {
            type: dataTypes.INTEGER    
        },
        discount: {
            type: dataTypes.INTEGER    
        },
        subtotal: {
            type: dataTypes.INTEGER    
        },
        total: {
            type: dataTypes.INTEGER    
        },
        cliente_id: {
            type: dataTypes.INTEGER,
            references: {
                model: "cliente",
                key: "id"
            }
        }
    }

 const config = {
    tableName: 'shopping_cart',
    timestamps: false
 }
const Carrito = sequelize.define(alias, cols, config); 

Carrito.associate = function(models) {
    Carrito.hasMany(models.Producto, {
        as: "carrito",
        foreignKey: "producto_id"
    })
    Carrito.belongsTo(models.Cliente, {
        as: "cliente_carrito",
        foreignKey: "cliente_id"
    })
 };

return Carrito;

}
