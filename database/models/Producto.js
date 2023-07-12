module.exports = (sequelize, Datatype) => {
<<<<<<< HEAD
    const alias = 'Producto'
}
=======
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
        aliado_id: {
            type: dataTypes.INTEGER    
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
            type: dataTypes.DATETIME  
        },
        length: {
            type: dataTypes.TIME
        },
        image: {
            type: dataTypes.STRING  
        },
        difficulty: {
            type: dataTypes.INTEGER    
        },
        adress: {
            type: dataTypes.STRING  
        },
        city: {
            type: dataTypes.STRING  
        },
        age: {
            type: dataTypes.INTEGER 
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
    tableName: 'productos',
    timestamps: false
 }
const Producto = sequelize.define(alias, cols, config); 

 Producto.associate = function(models) {
    Producto.belongsTo(models.Carrito, {
        as: "carrito",
        foreignKey: "carrito_id"
    })
    Producto.belongsTo(models.Aliado, {
        as: "aliado",
        foreignKey: "aliado_id"
    })
    Producto.belongsToMany(models.Cliente, {
        as: "cliente",
        foreignKey: "cliente_id"
    })
    Producto.belongsTo(models.Aliado, {
        as: "aliado",
        foreignKey: "aliado_id"
    })
 }


return Producto;

}