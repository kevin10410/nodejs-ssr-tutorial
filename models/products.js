const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json',
);

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
  constructor(title, imageUrl, description, price) {
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
};
