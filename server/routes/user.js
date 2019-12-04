"use strict";
const route = require("express").Router();
const controller = require("../controllers/user");

route.post('/', controller.register);

module.exports = route;
