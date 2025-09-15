/* eslint-disable react/prop-types */
import useCTX from '../../hooks/useCTX.js';
import { createContext, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import ForgotPasswordRequestModal from '../modals/edit/ForgotPasswordRequestModal.jsx';
import { AnimatePresence } from 'framer-motion';
import { NavLink } from "react-router-dom"
import { genders } from '../../data/genders.js';
import { capitalizeFirstLetter } from '../../utils/formatTopicQuery.js';


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
  <form className = " w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto sm:pl-8 py-4 pr-10  rounded-2xl shadow-xl bg-neutral-100 dark:bg-zinc-950 flex justify-start items-center" onSubmit = {handleOnSubmit}>
    <div className = "flex flex-col gap-8 pl-8 pr-10 py-4">
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

Form.Birthdate = () => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);

  return (
    <div className="flex flex-col ">
      <label className="text-xs sm:text-[10px]">Birthdate</label>
      <input
        required
        type="date"
        color='neutral-200'
        className="p-1 text-base text-zinc-900 sm:text-[14px] bg-neutral-50 rounded-xl outline-none"
        name="birthdate"
        onChange={handleChange}
        value={formField?.birthdate}
      />
      <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
        Make sure to enter your correct birthdate, as it can only be changed once.
      </p>
    </div>
  );
}

Form.Gender = () => {

   const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
   
  return (
    <div className="w-full">
      <select onChange = {handleChange} name = 'gender' className="w-full outline-none">
        {
          genders.map((g) => {
             return <option value = {g}>
              {capitalizeFirstLetter(g)}
             </option>
          })
        }
      </select>
    </div>
  );
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
  const params = new URLSearchParams(window.location.search);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(params.get("forgotten") === "true");
  
  return <> 
  <AnimatePresence>
      {isForgotPasswordModalOpen && <ForgotPasswordRequestModal onClose = {() => setIsForgotPasswordModalOpen(false)} />}
  </AnimatePresence>
    <button form = "none" type = "button" onClick = {() => setIsForgotPasswordModalOpen(true)} >
    <p className = "text-xs sm:text-[10px] truncate active:underline text-blue-400">
    Forgot password
  </p>
  </button>
  </>
}

Form.ErrorMessage = ({error = ''}) => {
  
  return <p className = "h-2 text-xs sm:text-[10px] text-red-400">{error && error}</p>
}


Form.NavigateToLogin = () => {
  
  return <div className = "text-xs sm:text-[10px]">
    <p>Already signed up? <NavLink to = "/login" className = "text-blue-400">Login</NavLink></p>
  </div>
}
Form.NavigateToRegister = () => {
  
  return <div className = "text-xs sm:text-[10px]">
    <p>Doesn't have an account yet? <NavLink to = "/register" className = "text-blue-400">Register</NavLink></p>
  </div>
}

Form.Password = ({placeholder = "Password"}) => {
  const { handleChange = () => {}, formField = {}} = useCTX(FormContext);
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  return <div className = "flex w-full flex-col">
    <label className = "text-xs sm:text-[10px]">
      Password
    </label> 
    <div className = "p-1 rounded flex w-full justify-between text-base  sm:text-[14px] text- items-center">
          <input required type = { isShowPassword ? "text" : "password"} placeholder = {placeholder} className = "w-full outline-none p-1 rounded" name = "password" onChange = {handleChange} value = {formField?.password} /> 
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
    <p className = "w-fit px-6 py-1  bg-zinc-900/80 rounded text-white font-bold">
    {label}
  </p>
  </button>
}
  

export default Form