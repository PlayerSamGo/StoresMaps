const express = require('express');
const api = express.Router();

let UserController = require('../controllers/user');

api.post('/register', UserController.register);
api.post('/login',UserController.login);
api.post('/forgotPassword',UserController.forgotPassword);

module.exports = api;