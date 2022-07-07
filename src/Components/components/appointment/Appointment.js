import React from 'react';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Constants from '../../../constants/constants';
import './Appointment.css';

const Appointment = ({
    appointmentId,
    petName,
    dateOfAppointment,
    timeOfAppointment,
}) => {
    const cancelAppointmentHandler = () => {
        fetch(
            `${Constants.PETBASEURL}/deleteAppointments?appointmentId=${appointmentId}`,
            {
                method: 'DELETE',
            },
        ).then((response) => {
            if (response.ok) {
                toast.success('Appointment Deleted');
                window.location.reload();
            }
        });
    };

    return (
        <>
            <tbody>
                <tr className='appointment'>
                    <td>{appointmentId}</td>
                    <td>{petName}</td>
                    <td>{dateOfAppointment}</td>
                    <td>{timeOfAppointment}</td>
                    <td>
                        <Button
                            type='button'
                            className='btn btn-style btn-block mt-4 button'
                            onClick={cancelAppointmentHandler}>
                            Cancel
                        </Button>
                        <ToastContainer
                            className='toast-container'
                            position='top-center'
                            toastClassName='dark-toast'
                            autoClose={3000}
                        />
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default Appointment;
