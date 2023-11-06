// const App = () => {
//   const [otp,setOtp] = useState("")
//   const [ph,setPh] = useState("")
//   const [loading, setloading] = useState(false)
//   const [showOTP, setShowOTP] = useState(false)
//   const [user, setUser] = useState(null)
//   const navigate = useNavigate();

//   function onCaptchVerify(){
//     if(!window.recaptchaVerifier){
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
//         'size': 'invisible',
//         'callback': (response) => {
//           onSignInSubmit();
//           console.log(response)
//         }
//       });
//     }
//   }

//   function onSignInSubmit() {
//     setloading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;
//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//     .then((confirmationResult) => {

//       window.confirmationResult = confirmationResult;
//       setloading(false);
//       setShowOTP(true);
//       toast.success('OTP sent successfully');

//     }).catch((error) => {
//         console.log(error)
//         setloading(false);
//     });

//   }

// function onOTPVerify(){
//   setloading(true)
//   window.confirmationResult.confirm(otp).then(async (res) => {
//     console.log(res);
//     setUser(res.user);
//     setloading(false);
//     {<SignUp />}
//   })
//   .catch((err) => {
//     console.log(err);
//     setloading(false);
//   })
// }
//     return (
//     <section className="bg-cream flex items-center justify-center h-screen">
//     <div>
//       <Toaster toastOptions={{duration:4000}}/>
//       <div id="sign-in-button"></div>
//       {user ? ( <SignUp />
//  ) :     (  <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//         <h1 className="text-center leading-normal text-black font-medium text-3xl mb-6">
//           Welcome to <br /> AJOOBA
//         </h1>

//         {
//           showOTP ? (
//             <>
//             <div className="bg-white text-cream 500 w-fit mx-auto p-4 rounded-full">
//               <BsFillShieldLockFill size={30} />
//             </div>
//             <label htmlFor="ph" className="font-bold text-2xl text-black text-center">
//               Enter your OTP
//             </label>
//             <OtpInput
//             value={otp}
//             onChange={setOtp}
//             OTPLength={6}
//             otptype="number"
//             disabled={false}
//             autoFocus
//             className="opt-container"
//             ></OtpInput>
//             <button onClick={onOTPVerify} className="bg-white-600 w-full flex gap-1 items-center justify-center py2.5 text-black rounded">
//               {loading && <CgSpinner className="mt-1 animate-spin" size={20} />}
//               <span>Verify OTP</span>
//             </button>
//             </>
//           ) : <>
//           <div className="bg-white text-cream 500 w-fit mx-auto p-4 rounded-full">
//             <BsTelephoneFill size={30} />
//           </div>
//           <label htmlFor="ph" className="font-bold text-xl text-black text-center">
//             Verify your phone number
//           </label>
//           <PhoneInput country={"in"} value={ph} onChange={setPh}/>
//           <button onClick={onSignInSubmit} className="bg-white-600 w-full flex gap-1 items-center justify-center py2.5 text-black rounded">
//             {loading && <CgSpinner className="mt-1 animate-spin" size={20} />}
//             <span>Send code via SMS</span>
//           </button>
//           </>
//         }

//       </div>
//       )}
//     </div>
//     </section>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import OTPVerify from "./components/OTPVerification";
import SignUp from "./components/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OTPVerify />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
