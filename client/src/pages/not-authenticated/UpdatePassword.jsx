import { useParams } from "react-router-dom"
import Button from '../../components/html/Button.jsx';
import { useEffect, useState } from 'react';
import useAsync from '../../hooks/useAsync.js';
import { fetchApi } from '../../utils/fetchApi.js';


const UpdatePasswordPage = () => {
  const { token } = useParams();
  const [passForm, setPassForm] = useState({
    password: null, 
    confirmPassword: null
  })
  
  const [updatePassword, { isLoading, error }] = useAsync(async(e) => { 
    e.preventDefault();
    const { password, confirmPassword } = passForm;
    if(!password || !confirmPassword){
      throw new Error("Please fill up the required fields")
    }
    if(password !== confirmPassword){
      throw new Error("Passwords do not match.")
    }
    const res = await fetchApi("patch", "/user/update-password", {
      token, 
      password
    })
    console.log(res);
  }, [token, passForm])
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setPassForm(prev => ({
      ...prev, 
      [name]: value
    }))
  }

return <div className = "h-96 w-full flex justify-center items-center">
  <form onSubmit = {updatePassword} className = "pt-3 pb-8 px-3 w-11/12 sm:w-10/12 lg:w-8/12 rounded-lg gap-4 bg-zinc-900 space-y-2 flex flex-col">
    <h1 className = "text-lg lato">Update your password</h1>
    <div className = "flex flex-col gap-1">
      <label className = "text-xs">New Password</label>
      <input onChange = {handleChange} name = "password" value = {passForm.password} placeholder = "Password" className = "outline-none p-2 rounded-lg bg-zinc-800" />
    </div>
    <div className = "flex flex-col gap-1">
      <label className = "text-xs">Confirm Password</label>
      <input onChange = {handleChange} name = "confirmPassword" value = {passForm.confirmPassword} placeholder = "Confirm password" className = "outline-none p-2 rounded-lg bg-zinc-800" />
      { error && <p className = "text-red-400 text-xs">{error}</p>}
    </div>
    <div className = "w-full flex justify-end">
      <div className = "w-6/12">
              <Button type = "submit" >Update</Button>
      </div>
    </div>
  </form>
</div>
}

export default UpdatePasswordPage