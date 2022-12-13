const express = require('express');
const productController = require('../controllers/products.controller');
const validateNewProduct = require('../middlewares/validateNewProduct');

const productRouter = express.Router();

productRouter.post(
  '/',
  validateNewProduct.validateProduct,
  productController.registerProduct,
);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.get('/search', productController.getProductsBySearch);

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProductsById);

productRouter.put(
  '/:id',
  validateNewProduct.validateProduct,
  productController.updateProduct,
);

module.exports = {
  productRouter,
};
