import useCTX from '../../hooks/useCTX.js';
import { createContext } from 'react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PiStarFour } from "react-icons/pi";
const FormContext = createContext(null); 

const Form = ({children = null, label = 'Form', handleChange = () => {}, onSubmit = () => {}, formField = {}}) => {
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }


return <FormContext.Provider value = {{
  label, 
  handleChange, 
  formField
}}>
  <form className = " w-fit backdrop-blur-2xl rounded flex justify-start items-center" onSubmit = {handleOnSubmit}>
    <div className = "flex  flex-col gap-8 p-4 rounded">
          {children}
    </div>
  </form>
</FormContext.Provider>
}

Form.Label = ({defaultLabel = "Register"}) => {
  const { label = defaultLabel } = useCTX(FormContext);
  return <h1 className = "text-lg font-bold ">
    {label || defaultLabel}
  </h1>
}

Form.Username = ({placeholder = "Username"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  
  return <div className = "flex flex-col ">
    <label className = "text-xs">
      Username
    </label> 
    <input type = "text" placeholder = {placeholder} className = "p-1 rounded outline-none" name = "username" onChange = {handleChange} value = {formField?.username} />
  </div>
}

Form.ForgotPassword = () => {
  return <a href = "/forgot-password">
    <p className = "text-xs truncate outline text-blue-400">
    Forgot password
  </p>
  </a>
}


Form.NavigateToLogin = () => {
  
  return <div className = "text-xs">
    <p>Already signed up? <a href = "/login" className = "text-blue-400">Login</a></p>
  </div>
}
Form.NavigateToRegister = () => {
  
  return <div className = "text-xs">
    <p>Doesn't have an account yet? <a href = "/register" className = "text-blue-400">Register</a></p>
  </div>
}

Form.Password = ({placeholder = "Password"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  return <div className = "flex flex-col ">
    <label className = "text-xs">
      Password
    </label> 
    <div className = "p-1 rounded grid grid-cols-10 gap-1 items-center">
          <input type = { isShowPassword ? "text" : "password"} placeholder = {placeholder} className = " outline-none col-span-8 col-start-1" name = "password" onChange = {handleChange} value = {formField?.password} /> 
          <button onClick = {() => setIsShowPassword(prev => !prev)} className = "p-1 col-span-2 col-start-9">
             {
               isShowPassword ? <IoEyeOutline  /> : <IoEyeOffOutline  />
             }
          </button>
    </div>
  </div>
}


Form.Email = ({placeholder = "Email"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  
  return <div className = "flex flex-col ">
    <label className = "text-xs">
      Email
    </label> 
    <input type = "email" placeholder = {placeholder} className = "p-1 rounded outline-none" name = "email" onChange = {handleChange} value = {formField?.email} />
  </div>
}

Form.Submit = ({label = "Submit"}) => {
  
  return <button>
    <p className = "w-fit px-6 py-1 bg-zinc-900/80 rounded text-white font-bold">
    {label}
  </p>
  </button>
}
  

export default Form