import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSigninForm(!isSigninForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const formValidation = () => {
    const validationResponse = checkValidation(
      isSigninForm,
      name.current?.value,
      email.current.value,
      password.current.value
    );
    console.log("name", name.current?.value);
    console.log("email", email.current.value);
    console.log("password", password.current.value);
    setErrMessage(validationResponse);

    if (errMessage) return;

    if (!isSigninForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-5690-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              console.log("🚀 ~ file: Login.js:38 ~ .then ~ user:", user);
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          setErrMessage(`${errorCode}:${errorMessage}`);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("🚀 ~ file: Login.js:56 ~ .then ~ user:", user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(`${errorCode}:${errorMessage}`);
        });
    }
  };

  useEffect(() => {
    setErrMessage(null);
  }, [isSigninForm]);

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bgImage"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black text-gray-400 my-20 w-4/12 mx-auto right-0 left-0 p-8 bg-opacity-90 rounded-md"
      >
        <h1 className="text-3xl my-4 font-semibold text-white">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full rounded-md bg-gray-900"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Enter Email"
          className="p-4 my-2 w-full rounded-md bg-gray-900"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full rounded-md  bg-gray-900"
        />
        <button
          className="p-4 my-6 bg-red-700 rounded-md w-full font-medium text-white"
          onClick={formValidation}
        >
          {isSigninForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-700 font-bold py-4">{errMessage}</p>
        {isSigninForm && (
          <div className="justify-between flex text-xs">
            <span>Remember me</span>
            <span>Need help?</span>
          </div>
        )}
        <div className="my-6 text-sm">
          {isSigninForm ? "New to Netflix?" : "Already Registered?"}{" "}
          <span
            className="text-white cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSigninForm ? "Sign up now" : "Sign In now"}
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
