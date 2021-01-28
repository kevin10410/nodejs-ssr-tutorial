const path = require('path');

function getJSONDataPath(filename) {
  return path.join(
    path.dirname(require.main.filename),
    'data',
    `${filename}.json`,
  )
};

module.exports = {
  getJSONDataPath,
};
