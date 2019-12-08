"use strict";
const route = require("express").Router();
const controller = require("../controllers/user");

route.post('/login', controller.loginAttempt);
route.post('/', controller.register);
route.post('/google', controller.google);


module.exports = route;