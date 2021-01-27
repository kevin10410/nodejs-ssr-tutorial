const Product = require('../models/products');

function getShop (req, res, next) {
  res.render('shop', {
    path: '/',
    docTitle: 'Shop',
    products: Product.fetchAll(),
  });
};

function getAddProduct (req, res, next) {
  res.render('add-product', {
    docTitle: 'Add Product',
    path:'/admin/add-product',
  });
};

function postAddProduct (req, res, next) {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

module.exports = {
  getShop,
  getAddProduct,
  postAddProduct,
};
