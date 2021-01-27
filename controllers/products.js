const Product = require('../models/products');

function getShop (req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/index', {
      path: '/',
      docTitle: 'Shop',
      products,
    });
  });
};

function getAddProduct (req, res, next) {
  res.render('admin/add-product', {
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
