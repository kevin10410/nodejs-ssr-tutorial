const Product = require('../models/products');

function getAddProduct (req, res, next) {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path:'/admin/add-product',
  });
};

function getEditProduct (req, res, next) {
  const { id } = req.params;
  Product.findById(id, product => {
    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      edit: true,
      product,
    });
  });
};

function postAddProduct (req, res, next) {
  const { body } = req;
  const { title, imageUrl, price, description } = body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

function postEditProduct (req, res, next) {
  const { body } = req;
  const { id } = req.params;
  const { title, imageUrl, price, description } = body;
  const updateProduct = new Product(id, title, imageUrl, price, description);
  updateProduct.update();

  res.redirect('/admin/products')
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
  getEditProduct,
  postAddProduct,
  postEditProduct,
  getAdminProduct,
};
