//import React
import React, { useState } from "react";

//import Link for navigation
import { Link } from "react-router-dom";

//import useAuthState and auth to detect if they're a signed in user or not
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase-config";

//import signOut function for when user clicks sign out link
import { signOut } from "firebase/auth";

//import nav bar stylings
import '../Navbar/Navbar.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineXMark } from "react-icons/hi2";


export default function Navbar() {


  const signOutUserFromMobile = () => {
      signOut(auth)
      setNavBarOpen(false)
  }

  {/*sets authorized user to user variable*/}
  const [user] = useAuthState(auth);

  const [navBarOpen, setNavBarOpen] = useState(false)

  return (
  <>
    <div className="nav-container">
      <nav className="navbar">
        <div className="page-title-container">
          <h1 className="nav-title">
            <Link to='/' 
                  className="nav-title-link"
                  onClick={() => {setNavBarOpen(false)}}
              >
              Post Up
            </Link>
          </h1>
          <span className="nav-subtitle">
            A Spot For Bloggers
          </span>
        </div>
        <div className="nav-links">
          <div>
            {navBarOpen ? <HiOutlineXMark onClick={() => {setNavBarOpen(!navBarOpen)}} className="mobile-menu-button" /> : <GiHamburgerMenu onClick={() => {setNavBarOpen(!navBarOpen)}} className="mobile-menu-button" />}
          </div>
          {/*displays if the user is a signed in user currently*/}
          {user && (
              <>
                <Link className="nav-link nav-bar-link" to="/">
                  Home{" "}
                </Link>
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
          {!user && (
              <>
                <Link className="nav-link nav-bar-link" to="/">
                  Home{" "}
                </Link>
                <Link className="nav-link nav-bar-link" to="/login">
                  Log In{" "}
                </Link>
                <Link className="nav-link nav-bar-link" to="/signup">
                  Sign Up{" "}
                </Link>
              </>
            )}
        </div>
      </nav>
    </div>
    {!user && navBarOpen ? (
          <>
            <div className="mobile-backdrop"></div>
            <div className="mobile-menu">
              <Link className="mobile-nav-link nav-bar-link" to="/" onClick={() => {setNavBarOpen(!navBarOpen)}}>
                Home{" "}
              </Link>
              {/*displayed if the user is not a signed in user currently*/}
              <Link className="mobile-nav-link nav-bar-link" to="/login" onClick={() => {setNavBarOpen(!navBarOpen)}}>
                Log In{" "}
              </Link>
              <Link className="mobile-nav-link nav-bar-link" to="/signup" onClick={() => {setNavBarOpen(!navBarOpen)}}>
                Sign Up{" "}
              </Link>
            </div>
          </>) : ( null )
          }
    {user && navBarOpen ? (
          <>
            <div className="mobile-backdrop"></div>
            <div className="mobile-menu">
              <Link className="mobile-nav-link nav-bar-link" to="/" onClick={() => {setNavBarOpen(!navBarOpen)}}>
                Home{" "}
              </Link>
              <button className="mobile-nav-link nav-bar-link sign-out-button"
                      onClick={signOutUserFromMobile}
              >
                Sign Out
              </button>
            </div>
          </>) : ( null )
          }
  </>
  );
}