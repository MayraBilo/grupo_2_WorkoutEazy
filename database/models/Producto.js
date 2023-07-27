module.exports = (sequelize, dataTypes) => {

    const alias = 'Producto';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        activity_name: {
            type: dataTypes.STRING  
        },
        aliado_name: {
            type: dataTypes.STRING  
        },
        aliado_id: {
            type: dataTypes.INTEGER,   
        },
        category: {
            type: dataTypes.STRING  
        },
        subcategory: {
            type: dataTypes.STRING  
        },
        product_description: {
            type: dataTypes.STRING  
        },
        price: {
            type: dataTypes.DOUBLE    
        },
        discount: {
            type: dataTypes.INTEGER    
        },
        spots: {
            type: dataTypes.INTEGER    
        },
        schedule: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.TIME
        },
        image: {
            type: dataTypes.STRING  
        },
        difficulty: {
            type: dataTypes.STRING    
        },
        adress: {
            type: dataTypes.STRING  
        },
        city: {
            type: dataTypes.STRING  
        },
        age: {
            type: dataTypes.STRING 
        },
        mode: {
            type: dataTypes.STRING  
        },
        cliente_id: {
            type: dataTypes.INTEGER  
        },
        carrito_id: {
            type: dataTypes.INTEGER  
        }
    }

 const config = {
    tableName: 'product',
    timestamps: false
 }
const Producto = sequelize.define(alias, cols, config); 

Producto.associate = function(models) {
    
    // relación OK
    Producto.belongsToMany(models.Carrito, {
        as: "carrito",
        foreignKey: "carrito_id",
        through: "carrito_producto"
    })
    
    /*Producto.belongsTo(models.Aliado, {
        as: "aliado_producto",
        foreignKey: "aliado_id"
    })*/

    Producto.belongsToMany(models.Cliente, {
        as: "producto_cliente",
        foreignKey: "cliente_id",
        through: "cliente_producto"
    })
 }


return Producto;

}