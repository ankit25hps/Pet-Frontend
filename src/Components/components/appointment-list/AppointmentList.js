import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Appointment from '../appointment/Appointment';
import * as Constants from '../../../constants/constants';
import { AuthContext } from '../../../context/AuthContext';
import { Breadcrumb } from 'react-bootstrap';
import './AppointmentList.css';

function AppointmentList() {
    const [appointmentData, setAppointmentData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const userId = user.userId;

    console.log('user', user);

    useEffect(() => {
        try {
            fetch(
                `${Constants.PETBASEURL}/getAppointmentDetailsByUserId?userId=${userId}`,
                { mode: 'cors' },
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const transformedData = data.map((appointment) => {
                        return {
                            appointmentId: appointment.appointmentId,
                            petName: appointment.petName,
                            dateOfAppointment: appointment.dateOfAppointment,
                            timeOfAppointment: appointment.timeOfAppointment,
                        };
                    });
                    setAppointmentData(transformedData);
                });
        } catch (error) {
            setIsLoading(false);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <div className='appointment-list-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>View Appointments</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className=' appointment-heading-style'>
                <h2>Appointment Details</h2>
            </div>
            {isLoading && (
                <div className='appointments-loading-text'>Loading...</div>
            )}
            {!isLoading && !appointmentData.length && (
                <div className='no-appointment-data-text'>No data to show</div>
            )}
            <div className='appointments-list'>
                <table>
                    <tbody>
                        {!isLoading && appointmentData.length > 0 && (
                            <tr>
                                <th className='appointment-table-heading text-center'>
                                    Appointment ID
                                </th>
                                <th className='appointment-table-heading text-center'>
                                    Pet Name
                                </th>
                                <th className='appointment-table-heading text-center'>
                                    Date Of Appointment
                                </th>
                                <th className='appointment-table-heading text-center'>
                                    Time Of Appointment
                                </th>
                                <th className='appointment-table-heading text-center'>
                                    Actions
                                </th>
                            </tr>
                        )}
                    </tbody>

                    {!isLoading &&
                        appointmentData &&
                        appointmentData.map(
                            (
                                {
                                    petName,
                                    dateOfAppointment,
                                    timeOfAppointment,
                                    appointmentId,
                                },
                                index,
                            ) => (
                                <Appointment
                                    key={index}
                                    appointmentId={appointmentId}
                                    petName={petName}
                                    dateOfAppointment={dateOfAppointment}
                                    timeOfAppointment={timeOfAppointment}
                                />
                            ),
                        )}
                </table>
            </div>
            <ToastContainer
                className='toast-container'
                position='top-center'
                toastClassName='dark-toast'
                autoClose={2000}
            />
        </>
    );
}

export default AppointmentList;
