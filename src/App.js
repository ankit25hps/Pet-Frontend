import './App.css';
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from './context/AuthContext';
import UserProfile from './components/components/user-profile/UserProfile';
import AppointmentList from './components/components/appointment-list/AppointmentList';
import Login from './components/components/login/Login';
import PetList from './components/components/pet-list/PetList';
import NavBar from './components/reusable-components/navbar/NavBar';
import SideBar from './components/reusable-components/sidebar/SideBar';
import Home from './components/components/home/Home';
import SignUp from './components/components/sign-up/SignUp';
import AppointmentBookingForm from './components/components/appointment-booking-form/AppointmentBookingForm';
import RegisterPet from './components/components/register-pet/RegisterPet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/components/about-us/AboutUs';
import ContactUs from './components/components/contact-us/ContactUs';
import PrivacyPolicy from './components/components/privacy-policy/PrivacyPolicy';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            {!user ? (
                <Login />
            ) : (
                <div className='app-body'>
                    <div className='app-navbar'>
                        <NavBar />
                    </div>
                    <div className='app-content'>
                        <div className='app-sidebar'>
                            <SideBar />
                        </div>
                        <div className='app-component'>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/viewPets' element={<PetList />} />
                                <Route
                                    path='/registerPet'
                                    element={<RegisterPet />}
                                />
                                <Route
                                    path='/viewAppointments'
                                    element={<AppointmentList />}
                                />
                                <Route
                                    path='/bookAppointment'
                                    element={<AppointmentBookingForm />}
                                />
                                <Route
                                    path='/profile'
                                    element={<UserProfile />}
                                />
                                <Route path='/login' element={<Login />} />
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/aboutus' element={<AboutUs />} />
                                <Route
                                    path='/contactus'
                                    element={<ContactUs />}
                                />
                                <Route
                                    path='/privacypolicy'
                                    element={<PrivacyPolicy />}
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            )}
        </Router>
    );
};

export default App;
