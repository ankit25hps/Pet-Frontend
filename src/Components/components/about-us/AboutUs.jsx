import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import './AboutUs.css';

function AboutUs() {
    return (
        <>
            <div className='register-pet-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='about-us'>
                <h2 className='text-center about-us-heading'>About Us!</h2>
                <p>
                    PawWorld was founded on the idea that as pet dog owners,
                    there should be a convenient way to take care of our pets,
                    but also have peace of mind knowing they are being taken
                    care of 100% of the time. Some pet owners don't have enough
                    money to afford vet services and some sometimes can not find
                    time to register or keep up with their pets schedule. With
                    PawWorld, it's as easy as logging on!
                </p>

                <p>
                    When it comes to a dog, their owners tend to face variety of
                    issues like keeping them feed or finding a professional
                    grooming place for their pooch. Tailoring them the best
                    possible lifestyle is what we are aiming at and that is what
                    sets us apart from the rest. We hire only certified
                    veterinarians; we never forget customer satisfaction!
                </p>

                <p>
                    PawWorld is pet medical care on the go. Pet owners can find
                    and book veterinary appointments, online. PawWorld cares
                    about your pets as much as you do. Our dedicated team
                    constantly works to provide users with access to
                    high-quality clinics at all hours of the day, 365 days a
                    year.
                </p>
            </div>
        </>
    );
}
export default AboutUs;
