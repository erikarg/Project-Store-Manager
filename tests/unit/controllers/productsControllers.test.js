const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const sinon = require("sinon");
const {
  allProductsResponse,
  productSearchNameResponse,
  rightProductBody,
} = require("../../../__tests__/_dataMock");
const productsService = require("../../../src/services/products.service");
const productsController = require("../../../src/controllers/products.controller");
const { expect } = require("chai");

describe("Teste de unidade do productsController", function () {
  it("Testa se busca todos os produtos", async function () {
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getProductsList")
      .resolves({ status: 200, message: allProductsResponse });

    await productsController.getAllProducts({}, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(allProductsResponse);
  });
  it("Testa se busca os produtos por id", async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getProductsById")
      .resolves({ status: null, message: productSearchNameResponse });

    await productsController.getProductsById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(productSearchNameResponse);
  });
  it("Testa se registra um novo produto", async function () {
    const res = {};
    const req = {
      body: rightProductBody,
    };
    const newProduct = { id: 1, ...rightProductBody };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getRegisteredProduct")
      .resolves({ type: null, message: newProduct });

    await productsController.registerProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });
  it("Testa se atualiza um novo produto", async function () {
    const res = {};
    const req = {
      body: { name: rightProductBody.name },
      params: { id: 1 },
    };

    const newProduct = { id: req.params.id, name: rightProductBody.name };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, "getUpdatedProduct")
      .resolves({ type: null, message: newProduct });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProduct);
  });
  afterEach(sinon.restore);
});
