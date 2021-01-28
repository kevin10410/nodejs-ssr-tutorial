const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json',
);

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  };

  static fetchAll(cb) {
    fs.readFile(jsonFilePath, (err, content) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(content))
      }
    });
  };

  save() {
    this.id = Math.random().toString().replace(/^0\./, '');

    fs.readFile(jsonFilePath, (err, content) => {
      let products = err ? [] : JSON.parse(content);
      products.push(this);

      fs.writeFile(
        jsonFilePath,
        JSON.stringify(products),
        err => { console.log(err) }
      );
    });
  };
};
