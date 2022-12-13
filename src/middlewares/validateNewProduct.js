const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');
const productService = require('../services/products.service');

const validateProduct = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(statusCodes.BadRequest)
      .json({ message: errorMessages.nameNotFound });
  }
  if (name.length < 5) {
    return res
      .status(statusCodes.UnprocessableEntity)
      .json({ message: errorMessages.nameTooShort });
  }

  return next();
};

const verifyExistingProduct = async (id) => {
  const result = await productService.getProductsById(id);
  if (!result || result.status) {
    return true;
  }
  return false;
};

const checkErrors = (list) => {
  const result = list.find((item) => item !== undefined);
  return result;
};

const validateExistingProduct = async (req, res, next) => {
  const sale = req.body;
  const result = await Promise.all(
    sale.map(async (item) => {
      const product = await verifyExistingProduct(item.productId);
      if (product) {
        return {
          status: statusCodes.PageNotFound,
          message: errorMessages.productNotFound,
        };
      }
    }),
  );
  if (checkErrors(result)) {
    return res
      .status(checkErrors(result).status)
      .json({ message: checkErrors(result).message });
  }
  return next();
};

const validateProductId = async (req, res, next) => {
  const sale = req.body;
  const results = sale.map((item) => {
    if (item.quantity <= 0) {
      return {
        status: statusCodes.UnprocessableEntity,
        message: errorMessages.quantityTooShort,
      };
    }
    return undefined;
  });
  if (checkErrors(results)) {
    return res
      .status(checkErrors(results).status)
      .json({ message: checkErrors(results).message });
  }
  return next();
};

const validateQuantity = async (req, res, next) => {
  const sale = req.body;
  const result = sale.map((item) => {
    if (!item.quantity) {
      return { status: statusCodes.BadRequest, message: errorMessages.quantityNotFound };
    }
    if (!item.productId) {
      return { status: statusCodes.BadRequest, message: errorMessages.productIdNotFound };
    }
    return undefined;
  });
  if (checkErrors(result)) {
    return res
      .status(checkErrors(result).status)
      .json({ message: checkErrors(result).message });
  }
  return next();
};

module.exports = {
  validateProduct,
  validateQuantity,
  validateProductId,
  validateExistingProduct,
};
