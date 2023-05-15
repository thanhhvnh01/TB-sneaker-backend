const express = require('express');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/poductController');

const router = express.Router();

router.post('/register', authController.handleSignUp);
router.post('/login', authController.handleLogin);
// * product
router.get('/products', productController.handleGetAllProduct);
router.post('/create/products', productController.handleCreateProduct);
router.get('/product/:productId', productController.handleGetProductById);
router.post('/product-groups', productController.handleGetAllProductGroup);
router.get('/product-groups-id', productController.handleGetAllProductGroupId)
router.get(
  '/product-groups/:productGroupId',
  productController.handleGetProductGroupById
);
router.post('/create/product-groups', productController.handleCreateProductGroup)
router.put('/update/product/:productId', productController.handleUpdateProduct)
// * order
router.post('/order-create', orderController.handleCreateOrder)
router.get('/brands', orderController.handleGetBrandId)
router.get('/orders', orderController.handleGetAllOrder)
router.get('/orders/:orderId', orderController.handleGetOrderDetailById)
router.post('/create/subs', orderController.handleCreateSubs)
router.get('/subs', orderController.handleGetAllSubs)
// update product, product group,
module.exports = router;