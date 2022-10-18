const express = require('express');
const productController = require('../controllers/products.controller');
const { validateNewProduct } = require('../middlewares/validateNewProduct');

const productRouter = express.Router();

productRouter.post(
  '/',
  validateNewProduct,
  productController.registerProductController,
);

productRouter.get(
  '/',
  productController.getAllProductsController,
);

productRouter.get(
  '/:id',
  productController.getProductsByIdController,
);

module.exports = {
  productRouter,
};
