
const ThirtyDays = (((1000 * 60) * 60) * 24) * 30;
exports.storeCookie = (res, {
  key = null, 
  value = null, 
}) => {
  if(!key || !value){
    throw new Error("Key and value is expected to store cookies");
  }
  
    res.cookies(key, value, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: ThirtyDays, 
      sameSite: "None"
    })
  
}

exports.getCookie = async(res, {
  key = ''
}) => {
  if(!key)throw new Error("Key must be defined to get the responding cookie");
  
  const cookie = res.cookie(key, {
    httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      maxAge: ThirtyDays, 
      sameSite: "None"
  })
  
  return cookie;
}