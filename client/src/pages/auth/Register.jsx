import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {LockClosedIcon} from "@heroicons/react/20/solid";
import {TypeAnimation} from "react-type-animation";
import Step1 from "../../components/Register/Step1";
import Step2 from "../../components/Register/Step2";
import Step3 from "../../components/Register/Step3";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_live_51IVcniFkOBi2l0oyOSgKsTGqBNnUCVbo2tWOIC9dVfbZV61xabkbAffwAM5KaXyKG0l2Vc8md3nXXssrARK7PsCz00Gr2SRIej");


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

    const register = async (paymentMethodId) => {
        // Add code to handle the subscription plan selection and payment process
        // Then, proceed with registration
        await axios
            .post("/api/account/register", {
                firstName,
                lastName,
                email,
                password,
                subscriptionPlan,
                paymentMethodId,
            })
            .then((res) => {
                console.log("registered", res);
                navigate("/login");
            })
            .catch((err) => console.log("Error", err));
    };

  const goToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const goToPreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
          return (
              <Step1
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
              />
          );
        case 2:
            return (
                <Step2
                    subscriptionPlan={subscriptionPlan}
                    setSubscriptionPlan={setSubscriptionPlan}
                />
            );

        case 3:
            return (
                <Elements stripe={stripePromise}>
                    <Step3 register={register} />
                </Elements>
            );
        default:
            return <div></div>;
    }};

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full flex-grow flex items-center justify-center">
                <div className="w-full">
                    {step===1 && (
                    <img
                        className="mx-auto h-40 w-auto mb-10"
                        src="../../assets/images/logo(500x500).png"
                        alt="Muscles University"
                    />)}

                        {step===1 && (
                            <h2 className="text-center text-4xl font-bold tracking-tight font-axiom text-dark sm:min-h-[80px]" data-testid="register-title">
                        <TypeAnimation
                            sequence={[
                                'Register Now',
                                2000,
                                'Create an Account',
                                2000
                            ]}
                            speed={50}
                            className=""
                            wrapper="span"
                            repeat={Infinity}
                        />
                            </h2>)}
                        {step===2 && (
                            <h2 className="text-center text-4xl font-bold tracking-tight font-axiom text-dark sm:min-h-[80px]" data-testid="register-title">
                            <TypeAnimation
                                sequence={[
                                    'Select a plan',
                                    2000,
                                    'Join the community',
                                    2000
                                ]}
                                speed={50}
                                className=""
                                wrapper="span"
                                repeat={Infinity}
                            />
                            </h2>)}

                <form
                    className="mt-8 space-y-6"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (step === 3) {
                            register();
                        } else {
                            goToNextStep();
                        }
                    }}
                >
                    {renderStepContent(step)}
                    <div className="lg:w-1/4 m-auto space-y-4">
                    {step > 1 && (
                        <button
                            type="button"
                            className="m-auto bg-gray-200 text-gray-700 py-2 px-4 rounded"
                            onClick={goToPreviousStep}
                        >
                            Back
                        </button>
                    )}

                        {step === 1 ? (
                    <button
                        type="submit"
                        className=" m-auto font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2"
                    >
                        Register

                    </button>
                        ) : (step === 2 ? (
                            <button
                                type="submit"
                                className=" m-auto font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2"
                            >
                                Next

                            </button>) : (""))}

                        {step === 1 && (
                            <hr/>)}

                        {step === 1 && (
                    <div>
                        <Link to="/login">
                            <button
                                type="submit"
                                className="font-axiom group relative flex w-full justify-center rounded-md border border-transparent bg-medium py-2 px-4 text-sm font-medium text-slate-900 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-dark-500 focus:ring-offset-2"
                            >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                  className="h-5 w-5 text-dark-500 group-hover:text-dark-400"
                  aria-hidden="true"
              />
            </span>
                                Have an account? Login
                            </button>
                        </Link>

                    </div>
                        )}
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}

export default Register;