const Product = require('../models/products');

function getAddProduct (req, res, next) {
  res.render('admin/add-product', {
    docTitle: 'Add Product',
    path:'/admin/add-product',
  });
};

function postAddProduct (req, res, next) {
  const { body } = req;
  const { title, imageUrl, price, description } = body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

function getAdminProduct (req, res, next) {
  Product.fetchAll(products => {
    res.render('admin/products', {
      products,
      path:'/admin/products',
      docTitle: 'Admin Product',
    })
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getAdminProduct,
};
