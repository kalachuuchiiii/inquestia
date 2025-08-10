import useCTX from '../../hooks/useCTX.js';
import { createContext } from 'react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { PiStarFour } from "react-icons/pi";
const FormContext = createContext(null); 

const Form = ({children = null, label = 'Form', handleChange = () => {}, onSubmit = () => {}, formField = {}}) => {
  
  const handleOnSubmit = async(e) => {
    (e.preventDefault() && e.checkValidity())
    await onSubmit();
  }


return <FormContext.Provider value = {{
  label, 
  handleChange, 
  formField
}}>
  <form className = " w-fit backdrop-blur-2xl rounded flex justify-start items-center" onSubmit = {handleOnSubmit}>
    <div className = "flex flex-col gap-8 p-4 rounded">
          {children}
    </div>
  </form>
</FormContext.Provider>
}

Form.Label = ({defaultLabel = "Register"}) => {
  const { label = defaultLabel } = useCTX(FormContext);
  return <h1 className = "text-lg sm:text-base font-bold ">
    {label || defaultLabel}
  </h1>
}

Form.Username = ({placeholder = "Username"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  
  return <div className = "flex flex-col ">
    <label className = "text-xs sm:text-[10px]">
      Username
    </label> 
    <input required type = "text" placeholder = {placeholder} className = "p-1 text-base sm:text-[14px] rounded outline-none" name = "username" onChange = {handleChange} value = {formField?.username} />
  </div>
}

Form.ForgotPassword = () => {
  return <a href = "/forgot-password">
    <p className = "text-xs sm:text-[10px] truncate outline text-blue-400">
    Forgot password
  </p>
  </a>
}

Form.ErrorMessage = ({error = ''}) => {
  
  return <p className = "h-2 text-xs sm:text-[10px] text-red-400">{error && error}</p>
}


Form.NavigateToLogin = () => {
  
  return <div className = "text-xs sm:text-[10px]">
    <p>Already signed up? <a href = "/login" className = "text-blue-400">Login</a></p>
  </div>
}
Form.NavigateToRegister = () => {
  
  return <div className = "text-xs sm:text-[10px]">
    <p>Doesn't have an account yet? <a href = "/register" className = "text-blue-400">Register</a></p>
  </div>
}

Form.Password = ({placeholder = "Password"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  return <div className = "flex flex-col">
    <label className = "text-xs sm:text-[10px]">
      Password
    </label> 
    <div className = "p-1 rounded flex text-base sm:text-[14px] text- items-center">
          <input required type = { isShowPassword ? "text" : "password"} placeholder = {placeholder} className = " outline-none p-1 rounded" name = "password" onChange = {handleChange} value = {formField?.password} /> 
          <button type = "button" onClick = {() => setIsShowPassword(prev => !prev)} className = "p-3">
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
    <label className = "text-xs sm:text-[10px]">
      Email
    </label> 
    <input required type = "email" placeholder = {placeholder} className = "p-1 text-base sm:text-[14px] rounded outline-none" name = "email" onChange = {handleChange} value = {formField?.email} />
  </div>
}

Form.Submit = ({label = "Submit", disabled = false}) => {
  
  return <button type = "submit" disabled = {disabled}>
    <p className = "w-fit px-6 py-1 bg-zinc-900/80 rounded text-white font-bold">
    {label}
  </p>
  </button>
}
  

export default Form