const express = require('express');

const {
  getAddProduct,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  getAdminProduct,
  postDeleteProduct,
} = require('../controllers/admin');

const router = express.Router();

router.get('/products', getAdminProduct);
router.get('/add-product', getAddProduct);
router.get('/edit-product/:id', getEditProduct);

router.post('/add-product', postAddProduct);
router.post('/delete-product', postDeleteProduct);
router.post('/edit-product/:id', postEditProduct);

module.exports = router;
