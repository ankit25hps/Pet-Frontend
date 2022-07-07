import React, { useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';

import './UserProfile.css';

function UserProfile() {
    const { user } = useContext(AuthContext);
    const userName = user.userName;
    const userEmail = user.userEmail;
    return (
        <>
            <div className='user-profile-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='container p-5'>
                <div className='profile-picture'>
                    <img
                        src={
                            process.env.PUBLIC_URL + '/images/user-profile.png'
                        }
                        height={140}
                        width={160}
                        alt='userpic'
                    />
                </div>
                <div className='text-center name'>{userName}</div>
                <div className='text-center email'>{userEmail}</div>
            </div>
        </>
    );
}

export default UserProfile;
