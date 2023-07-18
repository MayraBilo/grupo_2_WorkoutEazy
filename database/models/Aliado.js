module.exports = (sequelize, dataTypes) => {
    const alias = 'Aliado'

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
            allowNull: false
        },
        document: {
            type: dataTypes.STRING,
            allowNull: false
        },
        document_number: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        birth_date: {
            type: dataTypes.DATE,
        },
        services_city: {
            type: dataTypes.STRING,
            allowNull: false
        },
        contact_number: {
            type: dataTypes.INTEGER,
            allowNull: false
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
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "aliado",
        timeStamps: false,
    };

    const Aliado = sequelize.define(alias, cols, config);

    // Relación no funciona
    // Borrar columna product_id
    /*
    Aliado.associate = function(models) {
        Aliado.hasMany(models.Producto, {
            as: "aliado_productos",
        })
     };
    */
    return Aliado;
};