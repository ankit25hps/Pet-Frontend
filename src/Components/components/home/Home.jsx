import React from 'react';
import { Carousel } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import './Home.css';

function Home() {
    return (
        <>
            <div className='home'>
                <Breadcrumb>
                    <Breadcrumb.Item active>Home</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='welcome-heading'>Welcome to PawWorld!</div>
            <div className='main'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className='d-block'
                            style={{
                                width: 800,
                                height: 400,
                                boxShadow: 100,
                            }}
                            src={
                                process.env.PUBLIC_URL + '/images/pets/pet1.jpg'
                            }
                            alt='First slide'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className='d-block'
                            style={{
                                width: 800,
                                height: 400,
                                boxShadow: 100,
                            }}
                            src={
                                process.env.PUBLIC_URL + '/images/pets/pet2.jpg'
                            }
                            alt='Second slide'
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className='d-block'
                            style={{
                                width: 800,
                                height: 400,
                                boxShadow: 100,
                            }}
                            src={
                                process.env.PUBLIC_URL + '/images/pets/pet3.jpg'
                            }
                            alt='Third slide'
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
}
export default Home;
