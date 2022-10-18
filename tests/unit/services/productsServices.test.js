const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../src/models/database/connection');
const productsModel = require('../../../src/models/products.model');
const productsService = require("../../../src/services/products.service");
const { allProductsResponse, wrongProductBody } = require('../../../__tests__/_dataMock');

describe("Testes de unidade do model de serviços", function () {
  it("Testa se retorna a lista completa de produtos", async function () {
    sinon.stub(productsModel, 'listAllProducts').resolves(allProductsResponse);
    const result = await productsModel.listAllProducts();
    expect(result).to.deep.equal(allProductsResponse);
  });
  it("Testa se há sucesso na busca pelo Id", async function () {
    sinon.stub(productsModel, 'listProductsById').resolves(allProductsResponse[0]);

    const result = await productsService.getProductsById(1);
    expect(result.status).to.deep.equal(null);
    expect(result.message).to.deep.equal(allProductsResponse[0]);
  })
  it("Testa se há erro caso o produto não exista", async function () {
    sinon.stub(productsModel, 'listProductsById').resolves(undefined);
      const result = await productsService.getProductsById(1);
      expect(result.status).to.equal(404);
      expect(result.message).to.equal("Product not found");
  });
    it("Testa o erro ao listar todos os produtos", async function () {
      sinon.stub(connection, 'execute').resolves([wrongProductBody]);
      const result = await productsService.getProductsList();
      expect(result.status).to.equal(404);
      expect(result.message).to.equal("Product not found");
    });
  afterEach(function () {
    sinon.restore();
  })
});
