const Product = require('../models/products');

function getAddProduct (req, res, next) {
  res.render('admin/edit-product', {
    docTitle: 'Add Product',
    path:'/admin/add-product',
  });
};

function getEditProduct (req, res, next) {
  const { id } = req.params;
  Product.findByPk(id)
    .then(product => {
      res.render('admin/edit-product', {
        docTitle: 'Edit Product',
        edit: true,
        product,
      });
    })
    .catch(err => { console.log(err) });
};

function postAddProduct (req, res, next) {
  const { title, imageUrl, price, description } = req.body;
  Product
    .create({ title, price, imageUrl, description })
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => { console.log(err) })
};

function postEditProduct (req, res, next) {
  const { body } = req;
  const { id } = req.params;
  const { title, imageUrl, price, description } = body;
  Product.findByPk(id)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => { console.log(err) })
};

function getAdminProduct (req, res, next) {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        products,
        path:'/admin/products',
        docTitle: 'Admin Product',
      })
    })
    .catch(err => { console.log(err) })
};

function postDeleteProduct (req, res, next) {
  const { id } = req.body;
  Product.findByPk(id)
    .then(product => product.destroy())
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => { console.log(err) })
};

module.exports = {
  getAddProduct,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  getAdminProduct,
  postDeleteProduct,
};
