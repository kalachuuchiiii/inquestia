const validator = require("validator");


exports.urlValidator = function (value) {
  return validator.isURL(value, {
    protocols: ["http", "https"], 
    require_protocol: true
  });
}