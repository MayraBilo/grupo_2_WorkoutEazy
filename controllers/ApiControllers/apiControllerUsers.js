const db = require("../../database/models");

const controller = {

        getApiList: async (req, res) => {
        try {
            const allClientes = await db.Cliente.findAll()

            return res.status(200).json({
                count: allClientes.length,
                data: allClientes,
                status: 200
            })
        }
        catch (error) {
            return res.status(500).json({
                message: "Error fetching clientes",
                error: error.message,
                status: 500
            });
        }
    },
    getApiDetail: async (req, res) => {
        try {
            const clienteId = req.params.id;
            const cliente = await db.Cliente.findByPk(clienteId)
            const urlProyecto = "http://localhost:3000/"
            
            return res.status(200).json({
                data: cliente,
                imageUrl: `${urlProyecto}/images/avatars/${cliente.image}`,
                status: 200
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error fetching cliente details",
                error: error.message,
                status: 500
            });
        };
    }
}


module.exports = controller;