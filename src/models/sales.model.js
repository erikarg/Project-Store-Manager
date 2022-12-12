const camelize = require('camelize');
const connection = require('./database/connection');

const listAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT t2.sale_id AS sale_id,
    t1.date AS date,
    t2.product_id AS product_id,
    t2.quantity AS quantity
    FROM StoreManager.sales as t1
    INNER JOIN StoreManager.sales_products AS t2
    ON t1.id = t2.sale_id
    ORDER BY t2.sale_id ASC`,
  );
  return camelize(result);
};

const listSalesById = async (newSaleId) => {
  const [result] = await connection.execute(
    `SELECT t1.date, t2.product_id, t2.quantity
    FROM StoreManager.sales as t1
    INNER JOIN StoreManager.sales_products AS t2
    ON t1.id = t2.sale_id
    WHERE t2.sale_id = ?
    ORDER BY t2.sale_id ASC`,
    [newSaleId],
  );
    return camelize(result);
};

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (NOW())',
    [],
  );
  return insertId;
};

const registerSales = async (saleId, productId, quantity) => {
  const result = await connection.execute(
    'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return result;
};

module.exports = {
  listAllSales,
  listSalesById,
  insertNewSale,
  registerSales,
};
