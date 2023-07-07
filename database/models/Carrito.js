module.exports = (sequelize, Datatype) => {
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
            type: dataTypes.INTEGER  
        }
    }

 const config = {
    tableName: 'carrito',
    timestamps: false
 }
const Carrito = sequelize.define(alias, cols, config); 

Carrito.associate = function(models) {
    Carrito.hasMany(models.Producto, {
        as: "producto",
        foreignKey: "producto_id"
    })
 };

return Carrito;

}
