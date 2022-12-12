const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateNewProduct = require('../middlewares/validateNewProduct');

const salesRouter = express.Router();

salesRouter.post(
  '/',
  validateNewProduct.validateProductId,
  validateNewProduct.validateQuantity,
  validateNewProduct.validateExistingProduct,
  salesController.registerNewSaleController,
);

salesRouter.get(
  '/',
  salesController.getAllSalesController,
);

salesRouter.get(
  '/:id',
  salesController.getSalesByIdController,
);

module.exports = {
  salesRouter,
};
