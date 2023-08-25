
const db = require("../../database/models");

const controller = {

    getApiList: (req,res) => {
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
          .catch(error => {
            return res.status(500).json({
                message: "Error fetching products",
                error: error.message,
                status: 500
            });
        });
    },
    getApiDetail: (req,res) => {
      const productId = req.params.id; 
        
        db.Producto.findByPk(productId, { include: [{ association: "aliado_producto" }] })
            .then(producto => {
                if (!producto) {
                    return res.status(404).json({
                        message: "Product not found",
                        status: 404
                    });
                }

                return res.status(200).json({
                    data: producto,
                    status: 200
                });
            })
            .catch(error => {
                return res.status(500).json({
                    message: "Error fetching product details",
                    error: error.message,
                    status: 500
                });
            });
    }
}


module.exports = controller;