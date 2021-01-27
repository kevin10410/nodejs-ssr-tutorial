const Product = require('../models/products');

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
  getAddProduct,
  postAddProduct,
};
