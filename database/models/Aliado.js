module.exports = (sequelize, Datatype) => {
    const alias = 'Aliado'

    const cols = {
        id: {
            type: Datatype.STRING,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Datatype.STRING,
            allowNull: false,
        },
        last_name: {
            type: Datatype.STRING,
            allowNull: false,
        },
        aliado_profile: {
            type: Datatype.STRING,
            allowNull: false,
        },
        entity_name: {
            type: Datatype.STRING,
            allowNull: true,
        },
        genre: {
            type: Datatype.STRING,
        },
        services: {
            type: Datatype.STRING,
            allowNull: false
        },
        /* VER */document: {
            type: Datatype.STRING,
            allowNull: false
        },
        document_number: {
            type: Datatype.NUMBER,
            allowNull: false
        },
        birth_date: {
            type: Datatype.DATE,
        },
        services_city: {
            type: Datatype.STRING,
            allowNull: false
        },
        contact_number: {
            type: Datatype.INTEGER,
            allowNull: false
        },
        email: {
            type: Datatype.STRING,
            allowNull: false,
        },
        image: {
            type: Datatype.STRING,
        },
        product_id: {
            type: Datatype.INTEGER,
            references: {
                model: "product",
                key: "id",
            },
        },
        password: {
            type: Datatype.STRING,
            allowNull: false,
        },
    };

    const config = {
        tableName: "aliado",
        timeStamps: false,
    };

    const Aliado = sequelize.define(alias, cols, config);

    Aliado.associate = function(models) {
        Aliado.hasMany(models.Producto, {
            as: "producto",
            foreignKey: "producto_id"
        })
     };
    
    return Aliado;
};