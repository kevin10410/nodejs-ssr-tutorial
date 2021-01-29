const fs = require('fs');
const { getJSONDataPath } = require('../util/path');
const path = require('path');

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

  save() {
    this.id = Math.random().toString().replace(/^0\./, '');

    getProductsFromFile(products => {
      products.push(this);

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
