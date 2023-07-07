const dotEnv = require("dotEnv").config();

module.exports = {
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
