const { expect } = require("chai");
const { PageNotFound } = require('../../../src/helpers/statusCodes');
const { getAllProductsService } = require('../../../src/services/products.service');
const { productNotFound } = require('../../../src/helpers/errorMessages');

describe("Testes de unidade do model de serviços", function () {
  it("Testa se os status HTTP estão corretos para cada situação", async function () {
    const result = await getAllProductsService();
    expect(result.status).to.equal(PageNotFound);
    expect(result.message).to.equal(productNotFound);
  });
});
