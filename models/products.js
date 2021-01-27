const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json',
);

module.exports = class Product {
  constructor(title) {
    this.title = title;
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
