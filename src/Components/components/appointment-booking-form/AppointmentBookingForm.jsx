import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from '../../../context/AuthContext';
import * as Constants from '../../../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AppointmentBookingForm.css';
import { Breadcrumb } from 'react-bootstrap';

const myRadioButton = ({ field }) => {
    return (
        <label className='text-gray-500 font-bold label'>
            <input {...field} className='mr-2 leading-tight' type='radio' />
            <span className='text-sm'>Yes</span>
        </label>
    );
};

const MyRadioButtonHook = () => {
    const [field] = useField({
        name: 'previousMedicationStatus',
        type: 'radio',
        value: 'no',
    });
    return (
        <label className='text-gray-500 font-bold'>
            <input {...field} className='mr-2 leading-tight' type='radio' />
            <span className='text-sm'>No</span>
        </label>
    );
};

const LoginSchema = Yup.object().shape({
    userPhoneNumber: Yup.string()
        .required('required')
        .matches(
            /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
            'Phone number is not valid',
        ),
    petName: Yup.string().required('Pet name is required'),
    dateOfAppointment: Yup.string().required('Date is required'),
    timeOfAppointment: Yup.string().required('Time Of Appointment is required'),
    reasonOfAppointment: Yup.string()
        .required('Reason of appointment is required')
        .max(100, 'Word limit exceeded'),
    petAllergies: Yup.string().max(100, 'Word limit exceeded'),
    previousMedicationStatus: Yup.string().required(
        'Previous Medication Status is required',
    ),
    procedureRequested: Yup.string().required('Procedure is required'),
});

function AppointmentBookingForm() {
    const { user } = useContext(AuthContext);
    const userId = user.userId;
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <div className='booking-form-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Appointment Booking Form
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='container appointment-form'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <Formik
                            initialValues={{
                                userPhoneNumber: '',
                                petName: '',
                                dateOfAppointment: '',
                                timeOfAppointment: '',
                                reasonOfAppointment: '',
                                petAllergies: '',
                                previousMedicationStatus: '',
                                procedureRequested: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={async (
                                values,
                                { setSubmitting, resetForm },
                            ) => {
                                const data = { userId, ...values };
                                try {
                                    await fetch(
                                        `${Constants.PETBASEURL}/addAppointments`,
                                        {
                                            method: 'POST',
                                            mode: 'cors',
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                                'Access-Control-Allow-Origin':
                                                    '*',
                                            },
                                            body: JSON.stringify(data),
                                        },
                                    ).then((response) => {
                                        if (response.status == '200') {
                                            toast.success(
                                                'Appointment was successfully booked.',
                                            );
                                        }
                                        if (response.status == '409') {
                                            toast.error(
                                                'Pet not registered. Please register pet and then book appointment.',
                                            );
                                        }
                                    });
                                    setSubmitted(true);
                                    resetForm();
                                    setSubmitting(false);
                                } catch (error) {
                                    toast.error('Something went wrong');
                                }
                            }}>
                            {({ touched, errors, isSubmitting }) => (
                                <div>
                                    <div className='row mb-3'>
                                        <div className='col-lg-12 appointment-booking-heading-style'>
                                            <h3 className='mt-5 text-center '>
                                                APPOINTMENT BOOKING FORM
                                            </h3>
                                        </div>
                                    </div>
                                    <div className='form'>
                                        <Form>
                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='userPhoneNumber'
                                                    className='label-style'>
                                                    Phone Number
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='userPhoneNumber'
                                                    placeholder='Enter phone number'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.userPhoneNumber && errors.userPhoneNumber
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='userPhoneNumber'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petName'
                                                    className='label-style'>
                                                    Pet Name
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='petName'
                                                    placeholder='Enter pet name'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petName && errors.petName
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petName'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='dateOfAppointment'
                                                    className='label-style'>
                                                    Date Of Appointment
                                                </label>
                                                <Field
                                                    type='date'
                                                    name='dateOfAppointment'
                                                    placeholder='Enter date'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.dateOfAppointment &&
                              errors.dateOfAppointment
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='dateOfAppointment'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='timeOfAppointment'
                                                    className='label-style'>
                                                    Time Of Appointment (select
                                                    one)
                                                </label>

                                                <Field
                                                    as='select'
                                                    name='timeOfAppointment'
                                                    className={`mt-2 form-control
                          ${
                              touched.timeOfAppointment &&
                              errors.timeOfAppointment
                                  ? 'is-invalid'
                                  : ''
                          }`}>
                                                    <option defaultValue>
                                                        Select
                                                    </option>
                                                    <option value='9-10 AM'>
                                                        9-10 AM
                                                    </option>
                                                    <option value='10-11 AM'>
                                                        10-11 AM
                                                    </option>
                                                    <option value='11-12 PM'>
                                                        11-12 PM
                                                    </option>
                                                    <option value='2-3 PM'>
                                                        2-3 PM
                                                    </option>
                                                    <option value='3-4 PM'>
                                                        3-4 PM
                                                    </option>
                                                    <option value='4-5 PM'>
                                                        4-5 PM
                                                    </option>
                                                    <option value='5-6 PM'>
                                                        5-6 PM
                                                    </option>
                                                </Field>
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='reasonOfAppointment'
                                                    className='label-style'>
                                                    Reason of Appointment
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='reasonOfAppointment'
                                                    placeholder='symptoms, diseases..'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.reasonOfAppointment &&
                              errors.reasonOfAppointment
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='reasonOfAppointment'
                                                    className='invalid-feedback'
                                                />
                                                <small>
                                                    Max word limit is 100
                                                </small>
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petAllergies'
                                                    className='label-style'>
                                                    Allergies (if any)
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='petAllergies'
                                                    placeholder='Enter allergies'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petAllergies && errors.petAllergies
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petAllergies'
                                                    className='invalid-feedback'
                                                />
                                                <small>
                                                    Max word limit is 100
                                                </small>
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='previousMedicationStatus'
                                                    className='label label-style'>
                                                    Previous Medication Status
                                                </label>
                                                <Field
                                                    name='previousMedicationStatus'
                                                    type='radio'
                                                    value='yes'
                                                    component={myRadioButton}
                                                />
                                                <MyRadioButtonHook />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='procedureRequested'
                                                    className='label-style'>
                                                    Procedure Requested
                                                </label>

                                                <Field
                                                    type='text'
                                                    name='procedureRequested'
                                                    placeholder='Vaccination, regular checkup etc..'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.procedureRequested &&
                              errors.procedureRequested
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='procedureRequested'
                                                    className='invalid-feedback'
                                                />
                                                <small>
                                                    Max word limit is 100
                                                </small>
                                            </div>

                                            <div className='text-center'>
                                                <Button
                                                    type='submit'
                                                    className='btn btn-style btn-block mt-4 button'
                                                    disabled={isSubmitting}>
                                                    {!isSubmitting
                                                        ? 'Submit'
                                                        : 'Submitting'}
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            )}
                        </Formik>
                        <ToastContainer
                            className='toast-container'
                            position='top-center'
                            toastClassName='dark-toast'
                            autoClose={2000}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppointmentBookingForm;
