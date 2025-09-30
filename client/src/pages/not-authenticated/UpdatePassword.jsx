import { useNavigate, useParams } from "react-router-dom"
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
  const nav = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] = useAsync(async(e) => { 
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
    if(!res?.success){
     nav('/login')
    }
  }, [token, passForm])
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setPassForm(prev => ({
      ...prev, 
      [name]: value
    }))
  }

return (
  <div className="h-96 w-full flex justify-center items-center">
    <form
      onSubmit={updatePassword}
      className="pt-3 pb-8 px-3 w-11/12 sm:w-6/12 lg:w-4/12 rounded-lg gap-4 bg-neutral-100  shadow-md dark:bg-zinc-900 space-y-2 flex flex-col"
    >
      <h1 className="text-lg lato">Update your password</h1>
      <div className="flex flex-col gap-1">
        <label className="text-xs">New Password</label>
        <input
          onChange={handleChange}
          name="password"
          value={passForm.password}
          placeholder="Password"
          className="outline-none p-2 rounded-lg dakr:bg-zinc-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs">Confirm Password</label>
        <input
          onChange={handleChange}
          name="confirmPassword"
          value={passForm.confirmPassword}
          placeholder="Confirm password"
          className="outline-none p-2  rounded-lg "
        />
        {isSuccess && (
          <p className="text-blue-600 text-xs">
            Successfully updated your password
          </p>
      )}
      </div>
      <div className="w-full flex justify-end">
        <div className="w-6/12">
          <Button loadingState={isLoading} type="submit">
            Update
          </Button>
        </div>
      </div>
    </form>
  </div>
);
}

export default UpdatePasswordPage