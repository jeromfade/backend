const { v4: uuidv4 } = require('uuid');

function generateApiKey() {
  return uuidv4();
}

module.exports = generateApiKey;