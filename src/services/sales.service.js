const statusCodes = require('../helpers/statusCodes');
const errorMessages = require('../helpers/errorMessages');
const salesModel = require('../models/sales.model');
const inputsValidations = require('./validations/inputsValidations');

const getSalesList = async () => {
  const result = await salesModel.listAllSales();
  if (result.length > 0) return { status: statusCodes.OK, message: result };
  return {
    status: statusCodes.PageNotFound,
    message: errorMessages.saleNotFound,
  };
};

const getSalesById = async (id) => {
  const error = await inputsValidations.idValidationSales(id);
  if (error.status) return error;

  const result = await salesModel.listSalesById(id);
  return { status: null, message: result };
};

module.exports = {
  getSalesList,
  getSalesById,
};
