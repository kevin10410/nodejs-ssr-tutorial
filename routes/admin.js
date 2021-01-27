const express = require('express');

const {
  getAddProduct,
  postAddProduct,
  getAdminProduct,
} = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/products', getAdminProduct);
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);

module.exports = router;
