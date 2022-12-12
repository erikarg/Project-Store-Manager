const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');
const salesService = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  const products = await salesService.getSalesList();
  res.status(products.status).json(products.message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await salesService.getSalesById(Number(id));
  if (status) return res.status(statusCodes.PageNotFound).json({ message });

  res.status(statusCodes.OK).json(message);
};

const registerNewSale = async (req, res) => {
  const sale = req.body;
  const result = await salesService.registerNewSale(sale);
  return res.status(statusCodes.Created).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status } = await salesService.deleteNewSale(id);

  if (status) { return res.status(status).json({ message: errorMessages.saleNotFound }); }
  res.status(statusCodes.NoContent).json();
};

module.exports = {
  getAllSales,
  getSalesById,
  registerNewSale,
  deleteSale,
};
