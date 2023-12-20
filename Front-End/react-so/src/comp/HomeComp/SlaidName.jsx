import React from 'react'
import { Link } from 'react-router-dom'

export default function SlaidName() {
  return (
    <div className='slid'>
        <a href="#"> <span> <i className="fa-solid fa-rss"></i>  </span> About Us</a>
        <a href="#"> <span> <i class="fa-solid fa-user-plus"></i> </span>Contact</a>
        <Link to={'./Login'} href="#"> <span> <i class="fa-solid fa-right-to-bracket"></i> </span> Logout</Link>
        <button>Show More</button>
    </div>
  )
}