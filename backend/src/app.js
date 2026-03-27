const express = require('express');
const cors = require('cors');
const productosRouter = require('./routes/productos.routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', productosRouter);
module.exports = app;