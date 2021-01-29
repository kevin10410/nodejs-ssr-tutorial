const express = require('express');
const {
  getCart,
  postCart,
  getIndex,
  getOrders,
  getProduct,
  getCheckout,
  getProducts,
  postDeleteCartItem,
} = require('../controllers/shop');

const router = express.Router();

router.get('/', getIndex);
router.get('/cart', getCart);
router.get('/orders', getOrders);
router.get('/checkout', getCheckout);
router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/cart', postCart);
router.post('/delete-cart-item', postDeleteCartItem);

module.exports = router;
