import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const nav = useNavigate();

    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        nav('/');
        window.location.reload();
    };

    return (
        <div className='s-layout'>
            <div className='s-layout__sidebar'>
                <nav className='s-sidebar__nav'>
                    <ul>
                        <li>
                            <Link className='s-sidebar__nav-link' to='/aboutus'>
                                <em>About Us</em>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='s-sidebar__nav-link'
                                to='/contactus'>
                                <em>Contact Us</em>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='s-sidebar__nav-link'
                                to='/privacypolicy'>
                                <em>Privacy Policy</em>
                            </Link>
                        </li>
                        <li>
                            <p className='logout' onClick={logoutHandler}>
                                Logout
                            </p>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
