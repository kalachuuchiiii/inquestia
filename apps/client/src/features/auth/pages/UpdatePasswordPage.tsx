


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { TextInput } from "@/types";
import { useUpdatePassword } from "@/features/auth/hooks/useUpdatePassword";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

const UpdatePasswordPage = () => {

  const [passForm, setPassForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { updatePassword, isUpdatingPassword } = useUpdatePassword();

 
  const handleChange = (e: TextInput) => {
    const { name, value } = e.target;
    setPassForm((prev) => ({ ...prev, [name]: value }));
  };
  

  return (
   <div className="w-full w-screen oveflow-hidden flex items-center justify-center  h-screen">
      <form onSubmit={(e) => {
        e.preventDefault()
      }} className=" flex items-center justify-center">
        <Card className="w-100" >
        <CardHeader>
          <CardTitle>
            Update your password
          </CardTitle>
   
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <CardDescription>New password</CardDescription>
            <Input required value={passForm.newPassword} name = 'newPassword' onChange={handleChange} placeholder="Type your new password here..." />
          </div>
             <div>
            <CardDescription>Confirm password</CardDescription>
            <Input required  value={passForm.confirmPassword} name = 'confirmPassword' onChange={handleChange} placeholder="Confirm password" />
          </div>
        </CardContent>
        <CardFooter>
         <Dialog>
          <DialogContent>
            <DialogHeader>Update your password?</DialogHeader>
            <DialogFooter>
              <DialogClose >
                <Button variant={'outline'}>
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled = {isUpdatingPassword || !passForm.newPassword || !passForm.confirmPassword} onClick={() => updatePassword(passForm)} className="inquestia-button">Update</Button>
            </DialogFooter>
          </DialogContent>
          <DialogTrigger  disabled = {isUpdatingPassword || !passForm.newPassword || !passForm.confirmPassword}>
              <Button className = "inquestia-button">
            Update
          </Button>
          </DialogTrigger>
         </Dialog>
        </CardFooter>
      </Card>
      </form>
   </div>
  );
};

export default UpdatePasswordPage;
