const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateNewProduct = require('../middlewares/validateNewProduct');

const salesRouter = express.Router();

salesRouter.post(
  '/',
  validateNewProduct.validateProductId,
  validateNewProduct.validateQuantity,
  validateNewProduct.validateExistingProduct,
  salesController.registerNewSale,
);

salesRouter.put(
  '/:id',
  validateNewProduct.validateProductId,
  validateNewProduct.validateQuantity,
  validateNewProduct.validateExistingProduct,
  salesController.updateSale,
);

salesRouter.delete('/:id', salesController.deleteSale);

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSalesById);

module.exports = {
  salesRouter,
};
