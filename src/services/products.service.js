const statusCodes = require('../helpers/statusCodes');
const errorMessages = require('../helpers/errorMessages');
const productsModel = require('../models/products.model');
const { idValidation } = require('./validations/inputsValidations');

const getProductsList = async () => {
  const result = await productsModel.listAllProducts();
  if (result.length > 0) return { status: statusCodes.OK, message: result };
  return { status: statusCodes.PageNotFound, message: errorMessages.productNotFound };
};

const getProductsById = async (id) => {
  const error = await idValidation(id);
  if (error.status) return error;

  const result = await productsModel.listProductsById(id);
  return { status: null, message: result };
};

module.exports = {
  getProductsList,
  getProductsById,
};
