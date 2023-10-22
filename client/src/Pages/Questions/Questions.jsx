import React from 'react'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import Homemainbar from '../../components/Homemainbar/Homemainbar'
import Rightsidebar from '../../components/Rightsidebar/Rightsidebar'
import '../../App.css'
const Questions = () => {
  return (
    <div className='home-container-1'>
        <Leftsidebar/>
        <div className="home-container-2">
            <Homemainbar/>
            <Rightsidebar/>
        </div>
    </div>
  )
}

export default Questions