"use strict";
const route = require("express").Router();
const controller = require("../controllers/article");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

route.get("/", controller.showArticle);
route.use(authentication);
route.delete("/", authorization, controller.destroy);
route.get("/myarticle", controller.showAuthorArticle);
route.post("/", controller.addArticle);
route.patch("/", controller.edit);

module.exports = route;
