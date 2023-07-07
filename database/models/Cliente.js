module.exports = (sequelize, Datatype) => {
  const alias = "Cliente";

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
    genre: {
      type: Datatype.STRING,
    },
    birth_date: {
      type: Datatype.DATE,
    },
    city: {
      type: Datatype.STRING,
    },
    contact_number: {
      type: Datatype.INTEGER,
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
    tableName: "cliente",
    timeStamps: false,
  };

  const Cliente = sequelize.define(alias, cols, config);

  return Cliente;
};
