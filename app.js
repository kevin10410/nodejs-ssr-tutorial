const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const Product = require('./models/products');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/error');

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

async function initApp () {
  try {
    await Product.sync();
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
}

initApp();
