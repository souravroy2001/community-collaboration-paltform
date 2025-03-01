import { Box } from '@chakra-ui/react'
import React from 'react'

function Home() {
  return (
    <>
      <div className='homeDash'>
        <div className='homeHead'>
          <p>Home Dashboard</p>
          <img src="https://toppng.com/uploads/preview/stock-person-png-stock-photo-man-11563049686zqeb9zmqjd.png" alt="" />
        </div>
        <div className='trendingPost'>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='userProfile'>
          <p>User Profiles</p>
          
        </div>
      </div>
    </>
  )
}

export default Home
