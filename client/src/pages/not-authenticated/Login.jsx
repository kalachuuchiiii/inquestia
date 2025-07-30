import Form from '../../components/html/Form.jsx';
import useLogin from '../../hooks/auth/useLogin.js';

const Hero = () => {
  return <div className="pr-10  space-y-1">
    <h1 className="text-5xl lato">Welcome Back!</h1>
    <p>Ready to dive back in? Sign in to unlock everything</p>
  </div>
}

const LoginPage = () => {
  const { form, login, isLoginLoading, loginError, handleChange } = useLogin();

  return <div className="space-y-10 flex flex-col items-start w-full pl-6 justify-start pt-8">
    <Hero />
    <Form onSubmit={login} handleChange={handleChange} formField={form} label="Login" >
      <Form.Label defaultLabel="Login" />
      <Form.Email />
      <div>
        <Form.Password />
        <div className="space-y-2">
          <Form.ErrorMessage error={loginError} />
          <Form.NavigateToRegister />
        </div>
      </div>
      <Form.Submit disabled = {isLoginLoading} label={isLoginLoading ? "..." : "Login"} />

          </Form>
  </div>
}

export default LoginPage