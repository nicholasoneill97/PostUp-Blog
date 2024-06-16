//import React
import React from 'react'

//import social icons
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from 'react-icons/fa';

//import footer stylings
import '../Footer/Footer.css'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer-container'>
        <Link to='/' className='footer-title-container'>
            <div>
                <h1 className='footer-title'>
                    Post Up
                </h1>
                <h3 className='footer-subtitle'>
                    A Spot For Bloggers
                </h3>
            </div>
        </Link>
        
        <div className='social-icons'>
            <h1 className='socials-title'>
                Socials
                <div className='line'></div>
            </h1>
            <div className='icons-container'>
                <a href='https://github.com/nicholasoneill97' target='_blank'>
                    <FaGithub className='icon' />
                </a>
                <a href='https://www.facebook.com/' target='_blank'>
                    <FaFacebook className='icon'/>
                </a>
            </div>
        </div>
        <div className='developed-by'>
            <p>
                Thank You For Checking Out My Site!
            </p>
            <p>
                Coded and Styled By  
                <span> Nicholas O'Neill</span>.
            </p>
        </div>
    </div>
  )
}

export default Footer