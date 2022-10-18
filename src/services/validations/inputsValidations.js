const statusCodes = require('../../helpers/statusCodes');
const errorMessages = require('../../helpers/errorMessages');
const productsModel = require('../../models/products.model');
const salesModel = require('../../models/sales.model');
const { nameSchema } = require('./schemas');

const idValidation = async (id) => {
  const result = await productsModel.listProductsById(id);

  if (!result) return { status: statusCodes.PageNotFound, message: errorMessages.productNotFound };

  return { status: null, message: '' };
};

const idValidationSales = async (id) => {
  const result = await salesModel.listSalesById(id);

  if (!result || result.length === 0) {
    return { status: statusCodes.PageNotFound, message: errorMessages.saleNotFound };
  }
    return { status: null, message: '' };
};

const nameValidation = async (name) => {
  const { error } = nameSchema.validate({ name });

  if (error) return { status: statusCodes.BadRequest, message: error.message };

  return { type: null, message: '' };
};

const productValidation = async ({ id }) => {
  const name = await productsModel.listProductsById(id);
  if (!name) return { status: statusCodes.BadRequest, message: errorMessages.nameNotFound };
  if (name.length < 5) {
    return { status: statusCodes.UnprocessableEntity, message: errorMessages.nameTooShort };
  }
  return { status: null, message: '' };
};

module.exports = {
  idValidation,
  nameValidation,
  productValidation,
  idValidationSales,
};
