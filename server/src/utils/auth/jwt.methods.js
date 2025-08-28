const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_KEY;

exports.signToken = async(payload = null, expiresIn = "30d") => {
  if(!payload)throw new Error("No payload was found");
  return await jwt.sign(payload, JWT_SECRET, {
    expiresIn
  })
}

exports.decodeToken = async(token) => {
  if(!token)throw new Error("No token was found");
  try{
    return await jwt.verify(token, JWT_SECRET);
  }catch(e){
    return { error: e.message };
  }
}