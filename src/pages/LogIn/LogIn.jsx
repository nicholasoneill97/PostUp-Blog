//import React
//import useState hook for taking in password and email from form submission
import React, { useState } from "react";

//import Sign In function from firebase
import { signInWithEmailAndPassword } from "firebase/auth";

//import auth to match email and password to a user's
import { auth } from "../../firebase-config";

//import useNavigate for navigation to the home page when someone signs in
import { useNavigate } from "react-router-dom";

//import toast for when log in error occurs
import { ToastContainer, toast } from 'react-toastify';

//import log in stylings
import '../LogIn/LogIn.css'

//import loader animation on page load
import Loader from "../../components/Loader/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LogIn() {
  
  {/*sets useNavigate function a variable for home page animation after user signs in*/}
  let navigate = useNavigate();

  //useState hook initially setting showPassword to false hiding password by default
  const [showPassword, setShowPassword] = useState(false)

  //useState hooks initialized as empty strings for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {/*function that handles logging in, matches inputted data to database then returns an error if there is no match*/}
  const userLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  {/*function that handles if a user presses the enter key, triggers log in function to run*/}
  const keyDownLogIn = (e) => {
    if (e.key === "Enter") {
      userLogin()
    }
  }

  return (
  <>
    <Loader />
    <ToastContainer />
    {/*any time a user presses a key inside container it will check if it was "enter" key, and if so will trigger log in function*/}
    <div className="log-in-container" onKeyDown={keyDownLogIn}>
      <h1 className="log-in-title">
        Log In
      </h1>
      <div>
        <section className="email-container">
          <label className="email-title">
            Email
          </label>
          {/*input for setting email in useState hook*/}
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </section>
        <section className="password-container">
          <label className="password-title">
            Password
          </label>
          {/*input for setting password in useState hook*/}
          <div>
            <input
              type={!showPassword ? "password" : "text"}
              className="form-input"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          {/*whenever button is clicked, show password toggles between true or false*/}
            <button className="password-hide-show-button"
              onClick={() => {setShowPassword(!showPassword)}}>
              {/*displays normal eye when password is shown, then an eye with a slash through when it is hidden*/}
              {showPassword === true ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
        </section>
      </div>
      <br />
      {/*log in button that triggers login function to run upon clicking*/}
      <button className="log-in-button" onClick={userLogin}>
        Log In
      </button>
    </div>
  </>
  );
}