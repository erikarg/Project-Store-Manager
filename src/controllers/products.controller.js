const { productsService } = require('../services/products.service');

const getAllProductsController = async (_req, res) => {
  const products = await productsService.getAllProductsService();
  res.status(products.status).json(products.message);
};

module.exports = {
  getAllProductsController,
};
