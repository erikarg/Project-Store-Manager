const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const connection = require("../../../src/models/database/connection");
const { rightSaleBody } = require("../../../__tests__/_dataMock");

describe("Testes de unidade do model de sales", function () {
  this.afterEach(sinon.restore);
  it("Testa se é possível listar todas as vendas", async function () {
    sinon.stub(connection, "execute").resolves([rightSaleBody]);
    const result = await salesModel.listAllSales();
    expect(result).to.be.deep.equal(rightSaleBody);
  });
  it("Testa se é possível filtrar os produtos por Id", async function () {
    sinon.stub(connection, "execute").resolves([[rightSaleBody[0]]]);
    const result = await salesModel.listSalesById(1);
    expect(result).to.be.deep.equal([rightSaleBody[0]]);
  });
});
