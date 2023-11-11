import React from "react";
import { useState } from "react";
import {BsFillShieldLockFill, BsTelephoneFill} from "react-icons/bs"
import {CgSpinner} from "react-icons/cg"
import OtpInput from "otp-input-react"
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import {auth} from "../firebaseconfig"
import SignUp from "./SignUp";
import {RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"
import { toast, Toaster } from 'react-hot-toast';
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./OTPVerification.css"
import logoImage from '../images/ajooba-removebg-preview.png';
import bottomLogo from '../images/bottomlogo-removebg-preview.png';
import {getToken} from '@firebase/messaging'

export default function OTPVerify() {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setloading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    function onCaptchVerify() {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
          size: 'invisible',
          callback: (response) => {
            onSignInSubmit();
            console.log(response);
          },
        });
      }
    }
  
    function onSignInSubmit() {
      setloading(true);
      onCaptchVerify();
  
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + ph;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setloading(false);
          setShowOTP(true);
          toast.success('OTP sent successfully');
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
        });
    }
  
    function onOTPVerify() {
      setloading(true);
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          setUser(res.user);
          setloading(false);
          navigate('/signUp',{ state: { token: res.user.accessToken} })
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  
    return (
    <div className="otp-container">
      <div className="image-container">
        <img src={logoImage} alt="Ajooba Logo" className="logoImage" />
      </div>
        
        <div className="flex items-center justify-center h-1/2">
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="sign-in-button"></div>
          {user ? null : (
            <div className=" bg-white w-80 flex flex-col gap-4 rounded-lg p-4">

              <h1 className="text-center leading-normal text-grey font-medium text-3xl mb-6">
                WELCOME
              </h1>
  
              {showOTP ? (
                <>
                  {/* <div className="bg-white text-cream 500 w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div> */}
                  <label htmlFor="ph" className="font-bold text-2xl text-black text-center">
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otptype="number"
                    disabled={false}
                    autoFocus
                  ></OtpInput>
                  <button
                    onClick={onOTPVerify}
                    className="bg-white-600 w-full flex gap-1 items-center justify-center py2.5 text-black rounded"
                  >
                    {loading && <CgSpinner className="mt-1 animate-spin" size={20} />}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  {/* <div className="bg-white text-cream 500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div> */}
                  <label htmlFor="ph" className="font-bold text-xl text-black text-center">
                    Enter Mobile Number
                  </label>
                  <PhoneInput country={"in"} value={ph} onChange={setPh} />
                  <button
                    onClick={onSignInSubmit}
                    className="bg-orange-600 w-32 mx-auto flex gap-1 items-center justify-center py2.5 text-white rounded"
                  >
                    {loading && <CgSpinner className="mt-1 animate-spin" size={20} />}
                    <span>Login</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="bottom-image-container">
        <img src={bottomLogo} alt="Ajooba Logo" className="bottomlogoImage" />
        </div>
    </div>
    );
  }
  