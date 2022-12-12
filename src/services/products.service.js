const statusCodes = require('../helpers/statusCodes');
const errorMessages = require('../helpers/errorMessages');
const productsModel = require('../models/products.model');
const inputsValidations = require('./validations/inputsValidations');

const getProductsList = async () => {
  const result = await productsModel.listAllProducts();
  if (result.length > 0) return { status: statusCodes.OK, message: result };
  return { status: statusCodes.PageNotFound, message: errorMessages.productNotFound };
};

const getProductsById = async (id) => {
  const error = await inputsValidations.idValidation(id);
  if (error.status) return error;

  const result = await productsModel.listProductsById(id);
  return { status: null, message: result };
};

const getRegisteredProduct = async (name) => {
  const error = await inputsValidations.nameValidation(name);
  if (error.status) return error;

  const newProduct = await productsModel.registerProduct({ name });
  const insertNewProduct = await productsModel.listProductsById(newProduct);
  return { status: null, message: insertNewProduct };
};

const getUpdatedProduct = async (id, data) => {
  const error = await inputsValidations.idValidation(id);
  if (error.status) return error;

  await productsModel.updateProduct(id, data);
  const insertUpdatedProduct = await productsModel.listProductsById(id);
  return { status: null, message: insertUpdatedProduct };
};

const deleteProduct = async (id) => {
  const error = await inputsValidations.idValidation(id);
  if (error.status) return { status: error.status, message: errorMessages.productNotFound };

  const action = await productsModel.eraseProduct(id);
  return { status: null, message: action };
};

module.exports = {
  getProductsList,
  getProductsById,
  getRegisteredProduct,
  getUpdatedProduct,
  deleteProduct,
};
