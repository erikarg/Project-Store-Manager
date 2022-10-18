const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');

const validateNewProduct = async (req, res, next) => {
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

module.exports = {
  validateNewProduct,
};
