const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/mysql');
const User = require('./models/user');
const Product = require('./models/products');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { get404 } = require('./controllers/error');

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => { console.log(err) })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, {
  onDelete: 'CASCADE',
  constraints: true,
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

async function initApp () {
  try {
    await sequelize.sync();
    const user = await User.findByPk(1);
    if (!user) {
      await User.create({
        name: 'OTree',
        email: 'kevin10410@gmail.com',
      });
      const newUser = await User.findByPk(1);
      newUser.createCart();
    }
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
}

initApp();
