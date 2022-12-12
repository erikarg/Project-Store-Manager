const statusCodes = require('../helpers/statusCodes');
const salesService = require('../services/sales.service');

const getAllSalesController = async (_req, res) => {
  const products = await salesService.getSalesList();
  res.status(products.status).json(products.message);
};

const getSalesByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(Number(id));
  if (status) return res.status(statusCodes.PageNotFound).json({ message });

  res.status(statusCodes.OK).json(message);
};

const registerNewSaleController = async (req, res) => {
  const sale = req.body;
  const result = await salesService.registerNewSale(sale);
  return res.status(statusCodes.Created).json(result);
};

module.exports = {
  getAllSalesController,
  getSalesByIdController,
  registerNewSaleController,
};
