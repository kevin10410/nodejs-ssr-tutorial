const Cart = require('../models/cart');
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
    if (product) {
      res.render('shop/productDetail', {
        product,
        docTitle: product.title,
      });
    } else {
      res.redirect('/')
    }
  });
};

function getCart (req, res, next) {
  res.render('shop/cart', {
    path: '/cart',
    docTitle: 'Your Cart',
  });
};

function postCart (req, res, next) {
  const { id } = req.body;
  Product.findById(id, product => {
    Cart.addProduct(id, product.price);
    res.redirect('/cart');
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
  postCart,
  getIndex,
  getOrders,
  getProduct,
  getCheckout,
  getProducts,
};
