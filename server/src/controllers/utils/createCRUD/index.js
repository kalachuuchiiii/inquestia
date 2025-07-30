const mongoose = require("mongoose");
const { create } = require("./create.js");
const { read } = require("./read.js");
const { update } = require("./update.js");
const { deleteDoc } = require("./delete.js");
const { verifyModel } = require("../../../utils/schema/schema.methods.js");
const { routeBuilder } = require("./routeBuilder.js");
const { capitalize } = require("../../../utils/capitalize.js");

const Controller = (modelName) => {
  const Model = verifyModel(capitalize(modelName));
  const entity = modelName.toLowerCase().trim();
  const router = require("express").Router();
  const controller = {};

  const build = ({ method = "get", path = null, fn = () => { }, name, middlewares = [] }) => {
    controller[name] = {
      method,
      path,
      middlewares,
      fn
    }
  }
  
  build({
    name: "create",
    method: "post",
    path: `/${entity}`,
    fn: (req, res) => create(Model, req, res)
  })
  build({
    name: "read",
    method: "get",
    path: `/${entity}/:id`,
    fn: (req, res) => read(Model, req, res)
  })
  build({
    name: "update",
    method: "patch",
    path: `/${entity}/:id`,
    fn: (req, res) => update(Model, req, res),
  })
  build({
    name: "delete",
    method: "delete",
    path: `/${entity}/:id`,
    fn: (req, res) => deleteDoc(Model, req, res)
  })
  
  const getRouter = () => {
    Object.values(controller).forEach((field) => routeBuilder(router, { ...field }));
    return router;
  }
  
  return {
    entity,
    build,
    getRouter
  }
}

module.exports = Controller;