const express = require('express');

const productController = require('../controllers/productsControllers');

const router = express.Router();

router.get('/product/productDetail', productController.getDetail);
router.get('/product/productCart', productController.getCart);
router.get('/product/productList', productController.getList);
router.get('/product/productListYoga', productController.getListYoga);

module.exports = router;