import Form from '../../components/html/Form.jsx';
import useRegister from '../../hooks/auth/useRegister.js';
import VerifyEmailModal from '../../components/modals/verifyEmail.jsx';
import { AnimatePresence } from 'framer-motion';

const Hero = () => {

  return <div className="space-y-1  mx-auto pr-10">
    <h1 className="text-5xl lato">Getting Started</h1>
    <p>Sign up before your pet does!</p>
  </div>
}

const Register = () => {
  const { form, handleChange, sendCode, isCodeSent, register, isCodeSendingLoading, otpError,  isRegisterLoading, isRegistered, registerError, onClose} = useRegister();


  return <div className="space-y-10 pl-6 pt-8">
    <AnimatePresence>
      {isCodeSent && <VerifyEmailModal isRegistered = {isRegistered} isRegisterLoading = {isRegisterLoading} onClose = {onClose} email= {form.email} otpError = {otpError} isCodeSendingLoading = {isCodeSendingLoading} registerError = {registerError} register = {register} resend = {sendCode} />}
    </AnimatePresence>
    <Hero />
    <Form onSubmit={sendCode} formField={form} handleChange={handleChange} label="Register" >
      <Form.Label defaultLabel="Register" />
      <Form.Username />
      <Form.Email />
                  <div className = "">
            <Form.Password />
            <div className = "space-y-2">
              <Form.ErrorMessage error = {otpError} />
      <Form.NavigateToLogin />
            </div>
            </div>
      <div>
        <Form.Submit disabled = {isCodeSendingLoading} label={isCodeSendingLoading ? "..." : "Register"} />
      </div>
    </Form>
  </div>
}

export default Register