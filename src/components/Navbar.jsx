import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const values = [
        {
            name: 'Login',
            path: '/',
        },
        {
            name: 'Signup',
            path: '/register',

        }
    ];

    return (
        <div className='flex justify-between items-center bg-blue-600 py-2 px-2'>
            <div>
                <FaCalendarAlt color='white' size={22} />
            </div>
            <div className='flex gap-7'>
                {values.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive, isPending }) => (
                            "font-semibold px-3 py-[5px] rounded" +
                            (isActive ? " text-blue-600 bg-white" : " text-white")
                        )}
                    >

                        {item.name}

                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default Navbar