const { expect } = require("chai");
const sinon = require("sinon");
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/database/connection')
const { allProductsResponse } = require('../../../__tests__/_dataMock');

describe("Testes de unidade do model de produtos", function () {
  this.afterEach(sinon.restore);
  it("Testa se é possível listar todos os produtos", async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModel.listAllProducts();
    expect(result).to.be.deep.equal(allProductsResponse)
  });
  it("Testa se é possível filtrar os produtos por Id", async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);
    const result = await productsModel.listProductsById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0])
  });
});
