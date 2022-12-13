const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const sinon = require("sinon");
const {
  rightSaleBody,
  otherProductIdSaleBody,
} = require("../../../__tests__/_dataMock");
const salesService = require("../../../src/services/sales.service");
const salesController = require("../../../src/controllers/sales.controller");
const { expect } = require("chai");

describe("Teste de unidade do salesController", function () {
  it("Testa se busca todas as vendas", async function () {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'getSalesList')
      .resolves({ status: 200, message: rightSaleBody });

    await salesController.getAllSales({}, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(rightSaleBody);
  });
  it("Testa se busca as vendas pelo id", async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "getSalesById")
      .resolves({ status: null, message: otherProductIdSaleBody });

    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(otherProductIdSaleBody);
  });
  afterEach(sinon.restore);
});
