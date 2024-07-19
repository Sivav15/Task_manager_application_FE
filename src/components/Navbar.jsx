import React, { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutReducer } from '../features/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, avatar, firstName } = useSelector((state) => state.auth.auth);
    const dispatch = useDispatch();

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

    // useEffect(() => {
    //     if (token) {
    //         setLogin(true);
    //     }
    // }, [token]);

    const logout = () => {
        dispatch(logoutReducer())

        navigate('/');
    };

    return (
        <div className="flex justify-between items-center bg-blue-600 px-2 h-14">
            <div>
                <FaCalendarAlt color="white" size={22} />
            </div>
            {token ? (
                <div className="flex gap-4 items-center h-full">

                    <div className="rounded-full">
                        <img
                            src={avatar}
                            alt={firstName}
                            className="rounded-full w-8 h-8 object-cover"
                        />
                    </div>
                    <button className="font-semibold px-3 pt-0.5 pb-1 rounded text-white bg-red-500" onClick={logout}>
                        Logout
                    </button>
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
