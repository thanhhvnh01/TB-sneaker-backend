const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/poductController');

const router = express.Router();

router.post('/register', authController.handleSignUp);
router.post('/login', authController.handleLogin);
router.get('/products', productController.handleGetAllProduct);
router.post('/create/products', productController.handleCreateProduct);

module.exports = router;
