const Product = require('../models/products');

function getProducts (req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/products', {
      path: '/',
      docTitle: 'Shop',
      products,
    });
  });
};

module.exports = {
  getProducts,
};
