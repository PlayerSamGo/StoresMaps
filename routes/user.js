const express = require('express');
const api = express.Router();

let UserController = require('../controllers/user');

api.post('/register',UserController.register);

module.exports = api;