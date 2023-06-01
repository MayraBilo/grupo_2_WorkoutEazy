const express = require('express');

const productController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/product/productDetail', productController.getDetail);
router.get('/product/productCart', productController.getCart);
router.get('/product/createProduct', productController.getCreate);
router.get('/product/editeProduct', productController.getEdite);
router.get('/product/profileServices', productController.getService);
router.get('/product/', productController.getList);
router.get('/product/productListYoga', productController.getListYoga);
router.get('/product/productListFitness', productController.getListFitness);
router.get('/product/productListDeportes', productController.getListDeportes);
router.get('/product/productListDanzas', productController.getListDanzas);

module.exports = router;