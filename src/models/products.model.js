const snakeize = require('snakeize');
const connection = require('./database/connection');

const listAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const listProductsById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};

const registerProduct = async (product) => {
  const columns = Object.keys(snakeize(product)).map(
    (key) => `${key}`,
  ).join(', ');

  const placeholders = Object.keys(product).map(
    (_key) => '?',
  ).join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );
  return insertId;
};

const updateProduct = async (id, data) => {
  const [updating] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [data, id],
  );
  return updating;
};

const eraseProduct = async (id) => {
  const deleting = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return deleting;
};

module.exports = {
  listAllProducts,
  listProductsById,
  registerProduct,
  updateProduct,
  eraseProduct,
};
