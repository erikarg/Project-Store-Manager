const { productNotFound } = require('../helpers/errorMessages');
const { OK, PageNotFound } = require('../helpers/statusCodes');
const { productsModel } = require('../models');

const getAllProductsService = async () => {
  const result = await productsModel.listAllProducts();
  if (result.length > 0) {
    return { message: result, status: OK };
  }
  return {
    message: productNotFound,
    status: PageNotFound,
  };
};

module.exports = {
  getAllProductsService,
};
