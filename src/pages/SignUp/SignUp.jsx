//import useState hook for setting text values on form
import React, { useState } from "react";

//import createUser and updateProfile functions to create and update accounts
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

//import auth to create and update account
import { auth } from "../../firebase-config";

//import useNavigate to navigate user to home page after signing up
import { useNavigate } from "react-router-dom";

//import toast to notify user if process is successful or not
import { toast } from "react-toastify";

//import eye icons for password section
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

//import signup stylings
import '../SignUp/SignUp.css'

//import loader animation for page load 
import Loader from "../../components/Loader/Loader";

export default function SignUp() {

  //useState hook initially setting showPassword to false hiding password by default
  const [showPassword, setShowPassword] = useState(false)

  //useState hook for all form values set initially to empty string
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //sets useNavigate function to a variable
  let navigate = useNavigate();

  //function that handles signing up, displays toast if there is an issue 
  const userSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (error) {
      toast(error.code, { type: "error" });
    }
  };

  //function that handles if the user clicks enter on the form, triggers sign up function
  const keyDownSignUp = (e) => {
    if (e.key === "Enter") {
      userSignup()
    }
  }

  return (
  <>
    <Loader />
    <div className="sign-up-container" onKeyDown={keyDownSignUp}>
      <h1 className="sign-up-title">
        Sign Up
      </h1>
      <section className="name-container">
        <label className="name-title">
          Name
        </label>
        <input
          type="text"
          className="name-input"
          placeholder="Enter Name Here"
          maxLength={10}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
      </section>
      <section className="email-container">
        <label className="email-title">
          Email
        </label>
        <input
          type="email"
          className="email-input"
          placeholder="Enter Email Here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </section>

      <section className="password-container">
        <label className="password-title">
          Password
        </label>
        <div>
          {/*input type is set to "password" when showPassword is false, then "text" when true*/}
          <input
            type={!showPassword ? "password" : "text"}
            className="password-input"
            placeholder="Enter Password Here"
            minLength={8}
            maxLength={16}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          {/*whenever button is clicked, show password toggles between true or false*/}
          <button className="password-hide-show-button"
            onClick={() => {setShowPassword(!showPassword)}}>
            {/*displays normal eye when password is shown, then an eye with a slash through when it is hidden*/}
            {showPassword === true ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
      </section>
      <br />
      <button className="sign-up-button" onClick={userSignup}>
        Sign Up
      </button>
    </div>
  </>
  );
}