const express = require('express');
const {
  getCart,
  getIndex,
  getOrders,
  getProduct,
  getCheckout,
  getProducts,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);

module.exports = router;
