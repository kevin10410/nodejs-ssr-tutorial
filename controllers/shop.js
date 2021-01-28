const Product = require('../models/products');

function getIndex (req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products,
      path: '/',
      docTitle: 'Shop',
    });
  });
};

function getProducts (req, res, next) {
  Product.fetchAll(products => {
    res.render('shop/products', {
      products,
      path: '/products',
      docTitle: 'All Products',
    });
  });
};

function getProduct (req, res, next) {
  const { id } = req.params;
  Product.findById(id, product => {
    res.render('shop/productDetail', {
      product,
      docTitle: product.title,
    });
  });
};

function getCart (req, res, next) {
  res.render('shop/cart', {
    path: '/cart',
    docTitle: 'Your Cart',
  });
};

function getOrders (req, res, next) {
  res.render('shop/orders', {
    path: '/orders',
    docTitle: 'Your Orders',
  });
};

function getCheckout (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout',
  });
};

module.exports = {
  getCart,
  getIndex,
  getOrders,
  getProduct,
  getCheckout,
  getProducts,
};
