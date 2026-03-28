const httpMethods = ["post", "get", "put","delete","patch"];
exports.routeBuilder = (router = {}, {
    method = "get",
    path = null, 
    fn = null, 
    middlewares = [], 
  }) => {
    
    if(!method || !httpMethods.includes(method)){
      console.error(`${method} is not a valid http method`);
      return;
    } 
    if(!path || typeof path !== "string"){
      console.error(`Path is invalid`);
      return;
    }
    
    if(typeof fn !== "function"){
      console.error("fn must be a function!");
      return;
    }
    
    if(Array.isArray(middlewares) && middlewares.some((f) => typeof f !== "function")){
      console.error("A middleware must be a function!");
      return;
    }
    router[method](path, ...middlewares, fn);
  }
  