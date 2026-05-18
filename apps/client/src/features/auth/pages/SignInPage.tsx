import { useState, type FormEvent } from "react";
import { PASSWORD_MAX } from "@inquestia/constants";
import { useAuth } from "@/features/auth/hooks/useAuth.js";
import { Button } from "@/components/ui/button.js";
import type { TextInput } from "@/types/input.js";
import { AuthLayout } from "@/features/auth/components/AuthLayout.js";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.js";
import { MdEmail } from "react-icons/md";
import { Key } from "lucide-react";
import { NavLink } from "react-router-dom";

import type { LoginForm } from "@inquestia/schemas";

const SignInPage = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: TextInput) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginForm);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleLogin}
        className="flex h-full p-3 w-full items-start flex-col gap-3 items-center"
      >
        <div className="my-2 flex w-full   flex-col items-center">
          <img src={"/inka.gif"} className="size-8" />
          <h1 className="text-2xl">Login at</h1>
          <p className="text-5xl font-bold"> Inquestia</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className=" text-sm">Email</label>
          <InputGroup>
            <InputGroupAddon>
              <MdEmail />
            </InputGroupAddon>
            <InputGroupInput
              required
              type="email"
              className="p-1 text-base sm:text-[14px] rounded outline-none"
              name="email"
              placeholder="johndoe@gmail.com"
              onChange={handleChange}
              value={loginForm.email}
            />
          </InputGroup>
        </div>
        <div className="flex w-full flex-col">
          <label className="text-sm">Password</label>
          <div className="p-1 rounded flex w-full justify-between text-base  sm:text-[14px] text- items-center">
            <InputGroup>
              <InputGroupAddon>
                <Key />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="**********"
                type="password"
                required
                maxLength={PASSWORD_MAX}
                className="w-full outline-none p-1 rounded"
                name="password"
                onChange={handleChange}
                value={loginForm.password}
              />
            </InputGroup>
          </div>
        </div>
        <footer className="flex flex-col w-full gap-2 my-4">
          <Button type="submit" className="btn w-fit">
            Log me in!
          </Button>
          <div className="text-xs  gap-1 cursor-pointer ">
            <p>
              Doesnt' have an account?{" "}
              <NavLink
                to="/sign-up"
                className={"text-blue-400 hover:underline"}
              >
                Create an Account
              </NavLink>
            </p>
          </div>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default SignInPage;
