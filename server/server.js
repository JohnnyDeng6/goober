const express = require('express');
const cores = require('cors');
const logger = require('morgan');

const app = express();

const PORT = 8000;

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send("Hello world!");
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

