import Form from '../../components/html/Form.jsx';
import useLogin from '../../hooks/auth/useLogin.js';
import Button from '../../components/html/Button.jsx';

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
  const { form, login, isLoginLoading, loginError, handleChange } = useLogin();

  return <div className="space-y-10 grid grid-rows-2 align-content-start sm:grid-cols sm:grid-cols-2  w-full pl-6 pt-8">
    <Hero />
    <Form onSubmit={login} handleChange={handleChange} formField={form} label="Login" >
      <Form.Label defaultLabel="Login" />
      <Form.Email />
      <div>
        <Form.Password />
        <div className="space-y-2">
          <Form.ErrorMessage error={loginError} />
          <Form.NavigateToRegister /> <p className = "text-xs">or</p>
                    <Form.ForgotPassword />
        </div>
      </div>
      <div className = "w-6/12 h-10">
              <Button type = "submit" loadingState = {isLoginLoading} disabled = {isLoginLoading} >
        Log me in
      </Button>
      </div>
          </Form>
  </div>
}

export default LoginPage