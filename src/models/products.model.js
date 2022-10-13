const connection = require('./database/connection');

const listAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

module.exports = {
  listAllProducts,
};
