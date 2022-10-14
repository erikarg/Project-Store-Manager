const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../src/models/database/connection')
const { allProductsResponse } = require('../../../__tests__/_dataMock');

describe("Testes de unidade do model de produtos", function () {
  it("Testa se é possível listar todos os produtos", async function () {
    // Arranjo
    sinon.stub(connection, 'execute').returns(allProductsResponse);
    // Ação
    const result = await connection.execute("SELECT * FROM products");
    // Assertiva
    expect(result).to.equal(allProductsResponse)
  });
});
