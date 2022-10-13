const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("/../../../src/models/connection");
const productsModel = require("/../../../src/models/products.model");

const { products } = require("./mocks/products.model.mock");

describe("Testes de unidade do model de produtos", function () {
  it("Testa se é possível listar todos os produtos", async function () {
    sinon.stub(connection, "execute").resolves([{}]);
  });
});
