const express = require('express');
const productController = require('../controllers/products.controller');
const productsModel = require('../models/products.model');

const productRouter = express.Router();

productRouter.post('/products', productsModel.registerProduct);

productRouter.get('/', productController.getAllProductsController);

productRouter.get('/:id', productController.getProductsByIdController);

module.exports = {
  productRouter,
};
