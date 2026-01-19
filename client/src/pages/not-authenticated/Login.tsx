import Form from "../../components/html/Form.jsx";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { PASSWORD_MAX, type LoginForm } from "@shared/index.js";
import { useAuth } from "@/hooks/useAuth.js";
import { Button } from "@/components/ui/button.js";
import type { TextInput } from "@/types/input.js";
import { AuthLayout } from "@/components/AuthLayout.js";
import { Input } from "@/components/ui/input.js";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.js";
import { MdEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { Key } from "lucide-react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className="space-y-4 flex flex-col justify-center h-full sm:mx-12 mb-auto pr-10 max-w-md">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-neutral-100">
        Welcome Back!
      </h1>
      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
        Ready to dive back in? Sign in to unlock everything.
      </p>
      <p className="text-sm sm:text-base text-zinc-500 dark:text-neutral-100/60 leading-relaxed">
        Access personalized dashboards, track your progress, and continue where
        you left off. We’re excited to have you back on board!
      </p>
    </div>
  );
};

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuth();

  const handleChange = (e: TextInput) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(loginForm);
  }

  return (
    <AuthLayout hero={<Hero />}>
      <form onSubmit={handleLogin} className="flex items-start flex-col gap-2 items-center">
        <div className="my-2">
          <h1 className="text-xl">Login</h1>
          <p className="opacity-50"> at Inquestia</p>
        </div>
        <div className="flex flex-col w-full">
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
          <Button type = 'submit' className="inquestia-button w-fit">Log me in!</Button>
          <div className="text-xs  gap-1 cursor-pointer ">
            <p className="hover:underline text-blue-400">Forgot Password?</p>
            <p>
              Doesnt' have an account?{" "}
              <NavLink to="/register" className={'text-blue-400 hover:underline'}>Register</NavLink>
            </p>
          </div>
        </footer>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
