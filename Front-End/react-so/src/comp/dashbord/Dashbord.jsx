import React from 'react'
import PlayerTable from '../Dashboard/PlayerTable'
import { Link } from 'react-router-dom'

export default function Dashbord() {
  return (
    <>
            <div>
      {/* Sidebar */}
      <div className="w3-sidebar w3-bar-block"  style={{background:"aliceblue" , width: '20%'}} >
      <h3 style={{fontSize:"20px" ,textAlign:"center",paddingBottom:"em", fontFamily:"sans-serif"}} className="w3-bar-item">Dashbord Magic Media</h3>
        <Link style={{fontSize:"30px" , fontFamily:"sans-serif"}} to="/a" className="w3-bar-item w3-button">Home Page</Link>
        <Link style={{fontSize:"30px" , fontFamily:"sans-serif"}} to="/DashbordUser" className="w3-bar-item w3-button">Users</Link>
        <Link style={{fontSize:"30px" , fontFamily:"sans-serif"}} to="/DashbordRebot" className="w3-bar-item w3-button">Report</Link>
      </div>

      {/* Page Content */}
      <div style={{paddingLeft:"20%"}}>
        <div style={{fontSize:"30px" , fontFamily:"sans-serif" , background :"royalblue" , color :"white"}} className="w3-container">
          <h1>User</h1>
        </div>


        <div className="w3-container">
            <PlayerTable />
        </div>
      </div>
    </div>
    </>
  )
}
