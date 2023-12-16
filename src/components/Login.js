import React, { useState } from "react";
import Header from "./Header";

const Login = () => {

  const [isSigninForm, setIsSigninForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSigninForm(!isSigninForm);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bgImage"
        />
      </div>
      <form className="absolute bg-black text-gray-400 my-20 w-4/12 mx-auto right-0 left-0 p-8 bg-opacity-90 rounded-md">
        <h1 className="text-3xl my-4 font-semibold text-white">{isSigninForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSigninForm && (<input type="text" placeholder="Email or phone number" className="p-4 my-2 w-full rounded-md bg-gray-900"/>)}
        <input type="text" placeholder="Enter Full Name" className="p-4 my-2 w-full rounded-md bg-gray-900"/>
        <input type="password" placeholder="Password" className="p-4 my-2 w-full rounded-md  bg-gray-900"/>
        <button className="p-4 my-6 bg-red-700 rounded-md w-full font-medium text-white">{isSigninForm ? 'Sign In' : 'Sign Up'}</button>
        {isSigninForm && (<div className="justify-between flex text-xs">
          <span>Remember me</span>
          <span>Need help?</span>
        </div>)}
        <div className="my-6 text-sm">
          {isSigninForm ? 'New to Netflix?' : 'Already Registered?'} <span className="text-white cursor-pointer" onClick={toggleSignInForm}>{isSigninForm ? 'Sign up now' : 'Sign In now'}</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
