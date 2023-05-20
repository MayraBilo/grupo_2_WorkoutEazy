const express = require('express');

const productController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/product/productDetail', productController.getDetail);
router.get('/product/productCart', productController.getCart);
router.get('/product/createProduct', productController.getCreate);
router.get('/product/editeProduct', productController.getEdite);

module.exports = router;