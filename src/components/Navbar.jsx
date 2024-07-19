import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(false);

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLogin(true);
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="flex justify-between items-center bg-blue-600 px-2 h-14">
            <div>
                <FaCalendarAlt color="white" size={22} />
            </div>
            {isLogin ? (
                <div className="flex gap-4 items-center h-full">
                    <button className="font-semibold px-3 pt-0.5 pb-1 rounded text-white bg-red-500" onClick={logout}>
                        Logout
                    </button>
                    <div className="rounded-full">
                        <img
                            src="https://ui-avatars.com/api/?name=s"
                            alt="Profile"
                            className="rounded-full w-8 h-8 object-cover"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex gap-7 h-full items-center">
                    {values.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                "font-semibold px-3 pt-0.5 pb-1 rounded" +
                                (isActive ? " text-blue-600 bg-white" : " text-white")
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Navbar;
