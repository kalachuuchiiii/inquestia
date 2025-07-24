import Form from '../../components/html/Form.jsx';

 const Hero = () => {
   
   return <div className = "space-y-1  mx-auto pr-10">
     <h1 className = "text-5xl lato">Getting Started</h1>
     <p>Sign up before your pet does!</p>
   </div>
 }

const LoginPage = () => {


return <div className = "space-y-10 pl-6 pt-8">
        <Hero />
  <Form label = "Register" >
    <Form.Label defaultLabel = "Register" /> 
    <Form.Username />
    <Form.Email /> 
    <Form.Password /> 
    <Form.NavigateToLogin />
    <div>
          <Form.Submit label = "Register" />
    </div>
  </Form>
</div>
}

export default LoginPage