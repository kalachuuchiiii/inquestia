
const ThirtyDays = (((1000 * 60) * 60) * 24) * 30;
exports.storeCookie = (res, {
  key = null, 
  value = null, 
}) => {
  if(!key || !value){
    throw new Error("Key and value is expected to store cookies");
  }
  
    const cookie = res.cookie(key, value, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: ThirtyDays, 
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    })
    console.log(cookie);
    return cookie;
  
}
