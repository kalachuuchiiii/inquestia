import Form from '../../components/html/Form.jsx';
import useRegister from '../../hooks/auth/useRegister.js';
import VerifyEmailModal from '../../components/modals/verifyEmail.jsx';
import { AnimatePresence } from 'framer-motion';
import Button from '../../components/html/Button.jsx';

const Hero = () => {
  return (
    <div className="space-y-4 flex flex-col justify-center h-full sm:mx-12 mb-auto pr-10 max-w-md">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-neutral-100">
        Getting Started
      </h1>
      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300">
        Sign up before your pet does!
      </p>
      <p className="text-sm sm:text-base text-zinc-500 dark:text-neutral-100/60 leading-relaxed">
        Create your free account today and explore tools designed to make pet care 
        easier. Manage appointments, track health, and stay connected — all in one place.
      </p>
    </div>
  );
};



const Register = () => {
  const {
    form,
    handleChange,
    sendCode,
    isCodeSent,
    register,
    isCodeSendingLoading,
    otpError,
    isRegisterLoading,
    isRegistered,
    registerError,
    onClose,
  } = useRegister();

  return (
    <div className="space-y-10 grid grid-rows-2 sm:grid-cols sm:grid-cols-2  w-full pl-6 pt-8">
      <AnimatePresence>
        {isCodeSent && (
          <VerifyEmailModal
            isRegistered={isRegistered}
            isRegisterLoading={isRegisterLoading}
            onClose={onClose}
            email={form.email}
            otpError={otpError}
            isCodeSendingLoading={isCodeSendingLoading}
            registerError={registerError}
            register={register}
            resend={sendCode}
          />
        )}
      </AnimatePresence>
      <Hero />
      <Form
        onSubmit={sendCode}
        formField={form}
        handleChange={handleChange}
        label="Register"
      >
        <Form.Label defaultLabel="Register" />
        <Form.Username />
        <Form.Email />
        <div className="">
          <Form.Password />
          <div className="space-y-2">
            <Form.NavigateToLogin />
          </div>
        </div>
        <div className="w-6/12">
          <Button
            loadingState={isRegisterLoading}
            type="submit"
            disabled={isRegisterLoading}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register