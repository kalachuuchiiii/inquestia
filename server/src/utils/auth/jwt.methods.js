const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_KEY;

exports.signToken = (payload = null) => {
  if(!payload)throw new Error("No payload was found");
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "30d"
  })
}

exports.decodeToken = (token) => {
  if(!token)throw new Error("No token was found");
  try{
    return jwt.verify(token, JWT_SECRET);
  }catch(e){
    return null;
  }
}