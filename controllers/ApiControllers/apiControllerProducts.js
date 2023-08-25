
const db = require("../../database/models");

const controller = {

    getApiList: async (req, res) => {
        try {
            const allProducts = await db.Producto.findAll()
            const danzas = await db.Producto.findAll({ where: { category: 'Danzas' } })
            const yoga = await db.Producto.findAll({ where: { category: 'Yoga' } })
            const fitness = await db.Producto.findAll({ where: { category: 'Fitness' } })
            const deportes = await db.Producto.findAll({ where: { category: 'Deportes' } })
            const aliadoProducto = await db.Producto.findAll({ include: [{ association: "aliado_producto" }] })
            const arrayRelacion = aliadoProducto.map(relacion => {
                return {
                    nombre: relacion.activity_name,
                    aliado: relacion.aliado_producto
                }
            })

            return res.status(200).json({
                count: allProducts.length,
                data: allProducts,
                countByCategory: {
                    danzas: danzas.length,
                    yoga: yoga.length,
                    fitness: fitness.length,
                    deportes: deportes.length

                },
                aliadoProducto: arrayRelacion,
                status: 200
            })
        }
        catch (error) {
            return res.status(500).json({
                message: "Error fetching products",
                error: error.message,
                status: 500
            });
        }
    },
    getApiDetail: async (req, res) => {
        try {
            const productId = req.params.id;
            const producto = await db.Producto.findByPk(productId)
            const relacion = await db.Producto.findByPk(productId, { include: [{ association: "aliado_producto" }] })
            

            return res.status(200).json({
                data: producto,
                aliado: [relacion.aliado_producto],
                imageUrl: producto.image,
                status: 200
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error fetching product details",
                error: error.message,
                status: 500
            });
        };
    }
}


module.exports = controller;