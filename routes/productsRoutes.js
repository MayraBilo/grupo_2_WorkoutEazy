const express = require('express');
const path = require('path');
const multer = require('multer');

const productController = require('../controllers/productsControllers');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/products');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });
//@GET / products
router.get('/product/', productController.getList);

// @GET /products/:id/detail ---> /products/5/detail
router.get('/:id/productDetail', productController.getDetail);


// @GET /products/create
router.get('/createProduct', productController.getCreate);

// @POST /products
router.post('/product', upload.any('img'), productController.postProduct);

// @DELETE /products/:id/delete ---> /products/5/delete
router.delete('/:id/delete', productController.deleteProduct);

// @GET /products/:id/update 
router.get('/:id/editeProduct', productController.getEdit);

// @PUT /products/:id/update ---> /products/5/put
router.put('/:id/editeProduct', productController.updateProduct);

router.get('/productCart', productController.getCart);

router.get('/profileServices', productController.getService);

router.get('/productListYoga', productController.getListYoga);
router.get('/productListFitness', productController.getListFitness);
router.get('/productListDeportes', productController.getListDeportes);
router.get('/productListDanzas', productController.getListDanzas);




module.exports = router;