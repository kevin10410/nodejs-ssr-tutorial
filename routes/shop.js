const express = require('express');
const { products, getShop } = require('../controllers/products');

const router = express.Router();

router.get('/', getShop);

module.exports = router;
