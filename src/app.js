const express = require('express');
const { productNotFound } = require('./helpers/errorMessages');
const { OK, PageNotFound } = require('./helpers/statusCodes');
const connection = require('./models/database/connection');

const productsService = require('./services/products.service');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const result = await productsService.getAllProductsService();
  res.status(result.status).json(result.message);
});

app.get('/products/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  if (result.length > 0) {
    return res.status(OK).json(result[0]);
  }
  return res.status(PageNotFound).json({ message: productNotFound });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
