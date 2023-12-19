import React from 'react'
import Logo from '../../img/logo.png'
import { Link } from 'react-router-dom'

export default function Headera() {
  return (
    <>
    <header>
            <a href="#"><img width='70px' src={Logo} alt="" /></a>
            <div className="comp-header">
                <div className="icon-header">
                    <Link to="/Profile"><i class="fa-solid fa-user"></i></Link>
                    <a href="#"><i class="fa-solid fa-bell"></i></a>
                    <a href="#"><i class="fa-solid fa-message"></i></a>
        
                </div>
                <a className='Login' href="#">Logout</a>
                {/* <a className='Login' href="#">Login</a>
                <a className='Login' href="#">Sign Up</a> */}
            </div>
        </header>
    </>
  )
}
