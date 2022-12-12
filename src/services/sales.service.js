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

const registerNewSale = async (sale) => {
  const saleId = await salesModel.insertNewSale();
  const promises = await sale.map((item) =>
    salesModel.registerSales(saleId, item.productId, item.quantity));
  const promisesResult = await Promise.all(promises);
  if (promisesResult) return { id: saleId, itemsSold: sale };
  return { type: statusCodes.PageNotFound, message: errorMessages.productNotFound };
};

const deleteNewSale = async (id) => {
  const error = await inputsValidations.idValidation(id);
  if (error.status) return { status: error.status, message: errorMessages.saleNotFound };

  const action = await salesModel.eraseSale(id);
  return { status: null, message: action };
};

module.exports = {
  getSalesList,
  getSalesById,
  registerNewSale,
  deleteNewSale,
};
