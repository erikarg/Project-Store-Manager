const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = require("chai");
chai.use(sinonChai);
const inputsValidations = require("../../../src/services/validations/inputsValidations");
const productsService = require("../../../src/services/products.service");
const {
  rightProductBody,
  productCreateResponse,
  wrongProductBody,
  wrongSizeProductBody,
} = require("../../../__tests__/_dataMock");
const productsModel = require("../../../src/models/products.model");

describe("Testes de unidade das validações de input", function () {
  it("Testa se é possível listar os produtos por id", async function () {
    sinon
      .stub(inputsValidations, "idValidation")
      .resolves({ status: null, message: "" });
    const result = await inputsValidations.idValidation(2);
    expect(result.status).to.equal(null);
    expect(result.message).to.equal("");
  });
  it("Testa se é possível listar os produtos por nome", async function () {
    sinon
      .stub(productsService, "getRegisteredProduct")
      .resolves(productCreateResponse);
    const result = await inputsValidations.nameValidation("Produto1");
    expect(result.type).to.equal(null);
    expect(result.message).to.equal("");
  });
  it("Testa se é possível validar os produtos", async function () {
    sinon
      .stub(productsModel, "listProductsById")
      .resolves(productCreateResponse);
    const result = await inputsValidations.productValidation(
      productCreateResponse
    );
    expect(result.status).to.equal(null);
    expect(result.message).to.equal("");
  });
  this.afterEach(sinon.restore);
});
