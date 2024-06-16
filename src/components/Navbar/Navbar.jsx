//import React
import React from "react";

//import Link for navigation
import { Link } from "react-router-dom";

//import useAuthState and auth to detect if they're a signed in user or not
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";

//import signOut function for when user clicks sign out link
import { signOut } from "firebase/auth";

//import nav bar stylings
import '../Navbar/Navbar.css'


export default function Navbar() {

  {/*sets authorized user to user variable*/}
  const [user] = useAuthState(auth);

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="page-title-container">
          <h1 className="nav-title">
            <Link to='/' className="nav-link">
              Post Up
            </Link>
          </h1>
          <span className="nav-subtitle">
            A Spot For Bloggers
          </span>
        </div>
        <div className="nav-links">
          <Link className="nav-link nav-bar-link" to="/">
            Home{" "}
          </Link>
          {/*displayed if the user is not a signed in user currently*/}
          {!user && (
              <>
                <Link className="nav-link nav-bar-link" to="/login">
                    Log In{" "}
                </Link>
                <Link className="nav-link nav-bar-link" to="/signup">
                    Sign Up{" "}
                </Link>
              </>
            )}
        
          {/*displays if the user is a signed in user currently*/}
          {user && (
              <>
                <label className="signed-in-display">
                  Signed is as {user.displayName || user.email}
                </label>
                <button className="nav-link nav-bar-link"
                        onClick={() => {signOut(auth)}}
                >
                  Sign Out
                </button>
              </>
            )}
        </div>
      </nav>
    </div>
  );
}