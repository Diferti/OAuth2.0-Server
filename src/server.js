const express = require('express');
const parser = require('body-parser');
const jwt = require('jsonwebtoken');
const data = require('../src/data.js');

const PORT = process.env.PORT || 8000;

const server = express();

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});