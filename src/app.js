const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/auto_parts');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(router);

module.exports = app;