import React from "react";

function SideBar() {
    return (
        <div className='side-bar'>
            <ul className='nav flex-column vh-100'>
                <li className='nav-item'>
                    <a
                        className='nav-link side-bar-color active  p-3'
                        aria-current='page'
                        href='#'>
                        <b>About Us</b>
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link side-bar-color  p-3' href='#'>
                        <b>Contact Us</b>
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link side-bar-color  p-3' href='#'>
                        <b> Privacy Policy</b>
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link side-bar-color  p-3' href='#'>
                        <b>Logout</b>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
