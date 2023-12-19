import React from 'react'
import Header from './HomeComp/Header'
import Slaid from './HomeComp/Slaid'
import Post from './HomeComp/Post'
import PostAdded from './HomeComp/PosrAdded'
import UserOn from './HomeComp/UserOn'

export default function Home() {
  return (
    <div className='home'>
         <Header />
         <div className="container">
            <Slaid />
            <div className="container-comp">
            <Post />
            <PostAdded />
            </div>
            <UserOn />
         </div>
    </div>
  )
}