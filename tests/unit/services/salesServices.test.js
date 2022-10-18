const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/database/connection");
const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");
const {
  rightSaleBody,
  nonexistentProductIdBody,
} = require("../../../__tests__/_dataMock");

describe("Testes de unidade do model de serviços", function () {
  it("Testa se retorna a lista completa de vendas", async function () {
    sinon.stub(salesModel, "listAllSales").resolves(rightSaleBody);
    const result = await salesModel.listAllSales();
    expect(result).to.deep.equal(rightSaleBody);
  });
  it("Testa se há sucesso na busca pelo Id", async function () {
    sinon.stub(salesModel, "listSalesById").resolves(rightSaleBody[0]);

    const result = await salesService.getSalesById(1);
    expect(result.status).to.deep.equal(null);
    expect(result.message).to.deep.equal(rightSaleBody[0]);
  });
  it("Testa se há erro caso a venda não exista", async function () {
    sinon.stub(salesModel, 'listSalesById').resolves(undefined);
    const result = await salesService.getSalesById(1);
    expect(result.status).to.equal(404);
    expect(result.message).to.equal("Sale not found");
  });
  it("Testa o erro ao listar todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves(nonexistentProductIdBody);
    const result = await salesService.getSalesList();
    expect(result.status).to.equal(404);
    expect(result.message).to.equal("Sale not found");
  });
  afterEach(function () {
    sinon.restore();
  });
});
