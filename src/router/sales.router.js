const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.get(
  '/',
  salesController.getAllSalesController,
);

salesRouter.get(
  '/:id',
  salesController.getSalesByIdController,
);

module.exports = {
  salesRouter,
};
