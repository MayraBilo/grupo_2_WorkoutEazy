const path = require("path");
const db = require ("../database/models")
const { Op } = require('sequelize');

const controller = {
    getIndex: (req, res) => res.render("index"),

    getBlog: (req, res) => res.render("blog"),

    getSearch: async (req,res) => {

        try {
            
            let query = req.query.search;

            console.log(query)

            let searchedProduct = await db.Producto.findAll({
                where: {
                    activity_name: {[Op.like]: `%${query}%`}
                }
            });

            console.log(searchedProduct)
            
            if (searchedProduct.length === 0) {

                return res.render('productList', { productos: searchedProduct, message: 'No se encontraron productos.' });
            }else{

            return res.render('productList', { productos: searchedProduct });}
            
            
        } catch(error) {
            res.json(error);
        }
    }
};

module.exports = controller;