import Form from '../../components/html/Form.jsx';

 const Hero = () => {
   
   return <div className = "pr-10  space-y-1">
     <h1 className = "text-5xl opacity-70 lato">Welcome Back!</h1>
     <p>Ready to dive back in? Sign in to unlock everything</p>
   </div>
 }

const LoginPage = () => {


return <div className = "space-y-10 flex flex-col items-start w-full pl-6 justify-start pt-8">
        <Hero />
  <Form label = "Login" >
    <Form.Label defaultLabel = "Login" /> 
    <Form.Email /> 
    <Form.Password /> 
    <Form.NavigateToRegister />
    <div>
          <Form.Submit label = "Login" />
    </div>
  </Form>
</div>
}

export default LoginPage