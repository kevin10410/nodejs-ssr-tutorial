const fs = require('fs');
const Cart = require('./cart');
const { getJSONDataPath } = require('../util/path');

const jsonFilePath = getJSONDataPath('products');

function getProductsFromFile (cb) {
  fs.readFile(jsonFilePath, (err, content) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(content))
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
  };

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products
        .find(prod => prod.id === id);

      cb(product);
    });
  };

  static deleteById(id) {
    getProductsFromFile(products => {
      const updatedProducts = products
        .filter(product => product.id !== id);

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(updatedProducts),
        err => { console.log(err) }
      );

      const { price } = products
        .find(prod => prod.id === id);
      Cart.deleteProduct(id, price);
    });
  };

  save() {
    this.id = Math.random().toString().replace(/^0\./, '');

    getProductsFromFile(products => {
      products.push(this);
      console.log('products', products);

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(products),
        err => { console.log(err) }
      );
    });
  };

  update() {
    getProductsFromFile(products => {
      const index = products
        .findIndex(product => product.id === this.id);

      products.splice(index, 1, this);

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(products),
        err => { console.log(err) }
      );
    });
  }
};
