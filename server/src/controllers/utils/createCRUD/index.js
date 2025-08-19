const mongoose = require("mongoose");
const { create } = require("./create.js");
const { read } = require("./read.js");
const { update } = require("./update.js");
const { deleteDoc } = require("./delete.js");
const { verifyModel } = require("../../../utils/schema/schema.methods.js");
const { routeBuilder } = require("./routeBuilder.js");
const { capitalize } = require("../../../utils/capitalize.js");

const Controller = (modelName, {
  defaultCRUD = false
} = {}) => {
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