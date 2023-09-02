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
            const urlProyecto = "http://localhost:3000/"
            

            return res.status(200).json({
                data: producto,
                aliado: [relacion.aliado_producto],
                imageUrl: `${urlProyecto}/images/productos/${producto.image}`,
                status: 200
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error fetching product details",
                error: error.message,
                status: 500
            });
        };
    },

    getLastProduct: async (req,res) => {
        try {
            const lastProduct = await db.Producto.findOne({
                order: [['id', 'DESC']],
            });
    
            if (!lastProduct) {
                return res.status(404).json({
                    message: "No products found",
                    status: 404,
                });
            }
    
            return res.status(200).json({
                data: lastProduct,
                status: 200,
        });
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching last product",
                error: error.message,
                status: 500,
            });
        }
    },
    getDanzasProducts: async (req, res) => {
        try {
            const danzasProducts = await db.Producto.findAll({ where: { category: 'Danzas' } });

            if (!danzasProducts || danzasProducts.length === 0) {
                return res.status(404).json({
                    message: "No products found in the 'Danzas' category",
                    status: 404,
                });
            }
    
            return res.status(200).json({
                count: danzasProducts.length,
                data: danzasProducts,
                status: 200,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching 'Danzas' products",
                error: error.message,
                status: 500,
            });
        }
    }
}


module.exports = controller;