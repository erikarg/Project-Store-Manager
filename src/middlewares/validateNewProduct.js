const errorMessages = require('../helpers/errorMessages');
const statusCodes = require('../helpers/statusCodes');

module.exports = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(statusCodes.BadRequest).json(errorMessages.nameTooShort);
  }
  return next();
};
