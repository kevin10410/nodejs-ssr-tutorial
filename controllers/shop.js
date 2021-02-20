const Product = require('../models/products');

function getIndex (req, res, next) {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        products,
        path: '/',
        docTitle: 'Shop',
      });
    })
    .catch(err => { console.log(err) })
};

function getProducts (req, res, next) {
  Product.findAll()
    .then(products => {
      res.render('shop/products', {
        products,
        path: '/products',
        docTitle: 'All Products',
      });
    })
    .catch(err => { console.log(err) })
};

function getProduct (req, res, next) {
  const { id } = req.params;
  Product.findByPk(id)
    .then(product => {
      if (product) {
        res.render('shop/productDetail', {
          product,
          docTitle: product.title,
        });
      } else {
        res.redirect('/')
      }
    })
    .catch(err => { console.log(err) })
};

async function getCart (req, res, next) {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.render('shop/cart', {
      path: '/cart',
      docTitle: 'Your Cart',
      products,
    });
  } catch (err) { console.log(err) }
};

async function postCart (req, res, next) {
  const { id } = req.body;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id }});
    const selectedProduct = products[0];
    if (selectedProduct) {
      const quantity = selectedProduct.cartItem.quantity;
      cart.addProduct(selectedProduct, {
        through: { quantity: quantity + 1 }
      })
    } else {
      const product = await Product.findByPk(id);
      cart.addProduct(product, {
        through: { quantity: 1 }
      });
    }

    res.redirect('/cart');
  } catch (err) { console.log(err) }
};

async function postOrder (req, res, next) {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    const orderProds = products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity }
      return product;
    });
    await order.addProducts(orderProds);
    await cart.setProducts(null);
    res.redirect('/orders');
  } catch (err) { console.log(err);}
};

async function getOrders (req, res, next) {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });
    res.render('shop/orders', {
      path: '/orders',
      docTitle: 'Your Orders',
      orders,
    });
  } catch (err) { console.log(err);}
};

function getCheckout (req, res, next) {
  res.render('shop/checkout', {
    path: '/checkout',
    docTitle: 'Checkout',
  });
};

async function postDeleteCartItem (req, res, next) {
  const { id } = req.body;

  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id }});
    const selectedProd = products[0];
    await selectedProd.cartItem.destroy();

  } catch (err) { console.log(err) }
  res.redirect('/cart');
};

module.exports = {
  getCart,
  postCart,
  getIndex,
  getOrders,
  getProduct,
  getCheckout,
  getProducts,
  postOrder,
  postDeleteCartItem,
};
