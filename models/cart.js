const fs = require('fs');
const { getJSONDataPath } = require('../util/path');

const jsonFilePath = getJSONDataPath('cart')

function getCartProdocts (cb) {
  fs.readFile(jsonFilePath, (err, content) => {
    if (err) {
      cb({ products: [], totalPrice: 0 });
    } else {
      cb(JSON.parse(content))
    }
  });
}

module.exports = class Cart {
  static addProduct (id, price) {
    getCartProdocts(cart => {
      const index = cart.products
        .findIndex(prod => prod.id === id);

      if (index === -1) {
        cart.products.push({ id, qty: 1 })
      } else {
        const { qty } = cart.products[index];
        cart.products
          .splice(index, 1, { id, qty: qty + 1 })
      }

      cart.totalPrice += +price;

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(cart),
        err => { console.log(err) }
      );
    });
  };

  static deleteProduct(id, price) {
    getCartProdocts(cart => {
      const index = cart.products
        .findIndex(prod => prod.id === id);

      if (index === -1) return;

      const { qty } = cart.products[index];
      cart.products.splice(index, 1);
      cart.totalPrice -= qty * +price;

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(cart),
        err => { console.log(err) }
      );
    });
  };
};
