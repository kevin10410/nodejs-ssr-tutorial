const express = require('express');

const {
  getAddProduct,
  getEditProduct,
  postAddProduct,
  getAdminProduct,
} = require('../controllers/admin');

const router = express.Router();

router.get('/products', getAdminProduct);
router.get('/add-product', getAddProduct);
router.get('/edit-product/:id', getEditProduct);

router.post('/add-product', postAddProduct);

module.exports = router;
