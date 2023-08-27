const db = require("../../database/models");

const controller = {

        getApiList: async (req, res) => {
        try {
            const allUsers = await db.User.findAll()

            return res.status(200).json({
                count: allUsers.length,
                data: allUsers,
                status: 200
            })
        }
        catch (error) {
            return res.status(500).json({
                message: "Error fetching users",
                error: error.message,
                status: 500
            });
        }
    },
    getApiDetail: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await db.User.findByPk(userId)
            const urlProyecto = "http://localhost:3000/"
            
            return res.status(200).json({
                data: user,
                imageUrl: `${urlProyecto}/images/avatars/${user.image}`,
                status: 200
            });

        } catch (error) {
            return res.status(500).json({
                message: "Error fetching user details",
                error: error.message,
                status: 500
            });
        };
    }
}


module.exports = controller;