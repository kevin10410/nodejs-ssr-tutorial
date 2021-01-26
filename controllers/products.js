const products = [];

function getShop (req, res, next) {
  res.render('shop', {
    path: '/',
    docTitle: 'Shop',
    products,
  });
};

function getAddProduct (req, res, next) {
  res.render('add-product', {
    docTitle: 'Add Product',
    path:'/admin/add-product',
  });
};

function postAddProduct (req, res, next) {
  products.push({ title: req.body.title });
  res.redirect('/');
};

module.exports = {
  products,
  getShop,
  getAddProduct,
  postAddProduct,
};
