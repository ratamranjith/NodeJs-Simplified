const path = require('path');

const rootDir = path.dirname(require.main.filename);
console.log(rootDir);


module.exports = rootDir