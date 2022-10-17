const statusCodes = require('../../helpers/statusCodes');
const errorMessages = require('../../helpers/errorMessages');
const productsModel = require('../../models/products.model');
const { nameSchema } = require('./schemas');

const idValidation = async (id) => {
  const result = await productsModel.listProductsById(id);

  if (!result) return { status: statusCodes.PageNotFound, message: errorMessages.productNotFound };

  return { status: null, message: '' };
};

const nameValidation = async (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) return { status: statusCodes.BadRequest, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  idValidation,
  nameValidation,
};
