import axios from 'axios';

export const fetchApi = async(method = "get", route = "/", payload = {}, { credentials = true } = {}) => {
  try{
    const HTTPMethods = ["get", "post", "put", "patch", "delete"];
    if(!HTTPMethods.includes(method)){
      throw new Error(`${method} is mot a balid HTTP Method`);
    }
    
    const fullUrl = `${import.meta.env.VITE_SERVER_URL}/api${route}`;
    
    if(method === 'get' || method === 'delete'){
      const res = await axios[method](fullUrl, payload );
      return res.data;
    }
    
    const res = await axios[method](fullUrl, payload, { withCredentials: credentials });
    return res.data;
  }catch(e){
    console.log(e);
    throw new Error(e);
    
  }
}