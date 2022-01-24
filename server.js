const express = require('express');
const { resolve } = require('path');

const app = express();

app.use('/', express.static(
  resolve(
    __dirname,
    '/.build',
  ),
));

const PORT = 3000;

app.listen(process.env.PORT || PORT, (erro) => {
  if (erro) { return console.log(erro); }

  console.log('Tudo certo!');
});
