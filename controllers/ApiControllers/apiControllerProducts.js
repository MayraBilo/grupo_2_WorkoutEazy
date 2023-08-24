
const db = require("../../database/models");

const controller = {

    getList: (req,res) => {
        db.Producto.findAll({ include: [{ association: "aliado_producto" }] })
        .then(
            productos => {
              return res.status(200).json({
                count: productos.length,
                data: productos,
                status: 200
              })
            }
          )
    },
    getDetail: (req,res) => {}
}


module.exports = controller;