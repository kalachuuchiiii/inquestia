
const { routeBuilder } = require("./routeBuilder.js");

const Controller = (modelName) => {
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