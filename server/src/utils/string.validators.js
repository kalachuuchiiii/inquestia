exports.textValidator = (value) => /^[a-zA-Z0-9._]+$/.test(value);

exports.emailValidator = (value) => {
 return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

exports.lengthChecker = (value = '', {
  key = null,
  min = 0, 
  max = 100, 
  required = false
}) => {
  if(!key){
    console.warn("Key is a must to proceed");
    return;
  }
  
  if(!value && required){
    throw new Error(`${key} cannot be empty.`);
  }
  
  if(typeof value !== "string"){
    throw new Error(`${value} is not avalid string`);
  }
  value = value.trim();
  if(value.length < min){
    throw new Error(`${key} must be atleast ${min} characters.`);
  }
  if(value.length > max){
    throw new Error(`${key} must not exceed ${max} characters.`);
  }
  return value;
}