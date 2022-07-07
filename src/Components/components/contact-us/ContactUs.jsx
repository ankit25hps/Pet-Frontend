import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import './ContactUs.css';

function ContactUs() {
    return (
        <>
            <div className='register-pet-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='contact-us'>
                <p className='text-center contact-us-heading'>
                    Got questions we can answer?
                </p>
                <h2 className='text-center contact-us-heading-2'>
                    Contact Us!
                </h2>
                <div>
                    <div>
                        <p>
                            We're as passionate about your pets as you! We
                            understand your concerns and worries. Any queries
                            regarding how we work, your appointments and/or
                            general pet care? Feel free to talk to us!
                        </p>
                    </div>
                    <div>
                        <div className='contact-us-div'>
                            <div className='contact-us-div-child'>
                                <img
                                    id='phoneNumber'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/contact-us-images/phone.png'
                                    }
                                    height={40}
                                    width={40}
                                    alt='Phone'
                                />
                                <p className='contact-details'>
                                    +91 97653-76543
                                </p>
                            </div>
                            <div>
                                <img
                                    id='mail'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/contact-us-images/mail.png'
                                    }
                                    height={40}
                                    width={40}
                                    alt='Phone'
                                />
                                <p className=' mail contact-details'>
                                    pawworld@gmail.com
                                </p>
                            </div>
                        </div>
                        <div className='contact-us-div'>
                            <div className='contact-us-div-child'>
                                <img
                                    id='facebook'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/contact-us-images/facebook.png'
                                    }
                                    height={40}
                                    width={40}
                                    alt='Facebook'
                                />
                                <p className=' facebook contact-details'>
                                    www.facebook.com/pawworld
                                </p>
                            </div>
                            <div>
                                <img
                                    id='twitter'
                                    src={
                                        process.env.PUBLIC_URL +
                                        '/images/contact-us-images/twitter.png'
                                    }
                                    height={40}
                                    width={40}
                                    alt='Twitter'
                                />
                                <p className='twitter contact-details'>
                                    www.twitter.com/pawworld
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ContactUs;
