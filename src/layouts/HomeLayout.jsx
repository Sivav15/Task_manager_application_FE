import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomeLayout = () => {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeLayout