const express = require('express');
const rootRouter = require('./routers');
const cors = require('cors');
const app = express();

app.use(cors());

app.use('/', rootRouter);



app.listen('5000', () =>
  console.log(`Example app listening at http://localhost:5000`)
);