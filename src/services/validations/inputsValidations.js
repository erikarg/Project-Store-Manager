const statusCodes = require('../../helpers/statusCodes');
const errorMessages = require('../../helpers/errorMessages');
const productsModel = require('../../models/products.model');

const idValidation = async (id) => {
  const result = await productsModel.listProductsById(id);

  if (!result) return { status: statusCodes.PageNotFound, message: errorMessages.productNotFound };

  return { status: null, message: '' };
};

module.exports = {
  idValidation,
};
