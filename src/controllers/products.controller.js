// const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');
const productsService = require('../services/products.service');

const getAllProductsController = async (_req, res) => {
  const products = await productsService.getProductsList();
  res.status(products.status).json(products.message);
};

const getProductsByIdController = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.getProductsById(Number(id));
  if (status) return res.status(statusCodes.PageNotFound).json({ message });

  res.status(statusCodes.OK).json(message);
};

const registerProductController = async (req, res) => {
  const { name } = req.body;
  const { status, message } = await productsService.getRegisteredProduct(name);

  if (status) return res.status(statusCodes.BadRequest).json(message);

  res.status(statusCodes.Created).json(message);
};

module.exports = {
  getAllProductsController,
  getProductsByIdController,
  registerProductController,
};
