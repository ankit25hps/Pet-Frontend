import React from "react";
import logo from "../../../pawworld.png";
import userpic from "../../../user-profile.png";

function NavBar() {
    return (
        <div className='nav-bar'>
            <ul className='nav justify-content-end'>
                <li className='nav-item position-absolute top-0 start-0 '>
                    <img src={logo} height={100} width={120} alt='Logo' />
                </li>
                <li className='nav-item p-4'>
                    <a className='nav-link nav-color' href='#'>
                        <b>Register Pet</b>
                    </a>
                </li>
                <li className='nav-item dropdown p-4'>
                    <a
                        className='nav-link nav-color dropdown-toggle '
                        data-bs-toggle='dropdown'
                        href='#'
                        role='button'
                        aria-expanded='false'>
                        <b>Appointments</b>
                    </a>
                    <ul className='dropdown-menu p-4'>
                        <li>
                            <a className='nav-color dropdown-item p-4' href='#'>
                                <b>Book Appointment</b>
                            </a>
                        </li>
                        <li>
                            <a className='nav-color dropdown-item p-4' href='#'>
                                <b>View Appointment</b>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className='nav-item p-4'>
                    <img src={userpic} height={40} width={50} alt='User' />
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
