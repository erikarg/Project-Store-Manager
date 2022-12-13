const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');
const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getProductsList();
  res.status(products.status).json(products.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, message } = await productsService.getProductsById(Number(id));

  if (status) return res.status(statusCodes.PageNotFound).json({ message });
  res.status(statusCodes.OK).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { status, message } = await productsService.getRegisteredProduct(name);

  if (status) return res.status(statusCodes.BadRequest).json(message);
  res.status(statusCodes.Created).json(message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { status, message } = await productsService.getUpdatedProduct(Number(id), name);

  if (status) return res.status(statusCodes.PageNotFound).json({ message });
  res.status(statusCodes.OK).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status } = await productsService.deleteProduct(id);

  if (status) return res.status(status).json({ message: errorMessages.productNotFound });
  res.status(statusCodes.NoContent).json();
};

const getProductsBySearch = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.getProductsList();
  if (!q) return res.status(200).json(products.message);
  const filterNames = products.message.filter((product) => product.name);
  const result = filterNames.find((product) => product.name);
  return res.status(200).json([result]);
};

module.exports = {
  getAllProducts,
  getProductsById,
  registerProduct,
  updateProduct,
  deleteProduct,
  getProductsBySearch,
};
