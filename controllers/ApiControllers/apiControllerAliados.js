const db = require("../../database/models");

const controller = {

    getApiList: async (req, res) => {
        try {
            const urlProyecto = "http://localhost:3000"
            const allAliados = await db.Aliado.findAll()
            const selectedAliados = allAliados.map(aliado => ({
                id: aliado.id,
                name: aliado.first_name,
                last_name: aliado.last_name,
                servicio: aliado.services,
                email: aliado.email,
                detail: `${urlProyecto}/apiAliado/${aliado.id}/detailApi`
            }))

            return res.status(200).json({
                count: allAliados.length,
                data: selectedAliados,
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
            const aliadoId = req.params.id;
            const aliado = await db.Aliado.findByPk(aliadoId, {
                attributes: { exclude: ['password', 'category'] }
              })
            const urlProyecto = "http://localhost:3000/"

            return res.status(200).json({
                data: aliado,
                imageUrl: `${urlProyecto}/images/aliados/${aliado.avatar}`,
                status: 200
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error fetching cliente details",
                error: error.message,
                status: 500
            });
        };
    },
    getLastAliado: async (req,res) => {
        try {
            const lastAliado = await db.Aliado.findOne({
                order: [['id', 'DESC']],
            });
    
            if (!lastAliado) {
                return res.status(404).json({
                    message: "No Aliado found",
                    status: 404,
                });
            }
    
            return res.status(200).json({
                data: lastAliado,
                status: 200,
        });
        } catch (error) {
            return res.status(500).json({
                message: "Error fetching last Aliado",
                error: error.message,
                status: 500,
            });
        }
    },
}

module.exports = controller;