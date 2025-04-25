import React, { useContext, useState, useEffect } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css'; 
import { AuthContext } from '../../../context/AuthContext';
import * as Constants from '../../../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../reusable-components/spinner/customSpinner';
import SignUp from '../sign-up/SignUp';

const LoginSchema = Yup.object().shape({
    userEmail: Yup.string()
        .email('Invalid email address format')
        .required('Email is required'),
    userPassword: Yup.string()
        .matches(
            /^.*(?=.{8,})(?!.* )((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number, one special case character and no white spaces',
        )
        .required('Password is required'),
});

function Login() {
    const { setUser } = useContext(AuthContext);
    const [signUp, setSignUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();

    const redirectHandler = () => {
        setSignUp(!signUp);
        nav('/signup');
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return !signUp ? (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className='container login-form'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <Formik
                                initialValues={{
                                    userEmail: '',
                                    userPassword: '',
                                }}
                                validationSchema={LoginSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    try {
                                        fetch(
                                            `${Constants.AUTHENTICATIONBASEURL}/validatePetOwner`,
                                            {
                                                method: 'POST',
                                                mode: 'cors',
                                                headers: {
                                                    'Content-Type':
                                                        'application/json',
                                                    'Access-Control-Allow-Origin':
                                                        '*',
                                                },
                                                body: JSON.stringify(values),
                                            },
                                        )
                                            .then((response) => {
                                                if (response.ok) {
                                                    return response.json();
                                                }
                                                toast.error(
                                                    'Invalid credentials. Please login again',
                                                );
                                            })
                                            .then((data) => {
                                                setUser(data);
                                                setSubmitting(false);
                                            });
                                        nav('/');
                                    } catch (error) {
                                        toast.error(error.message);
                                    }
                                }}>
                                {({ touched, errors, isSubmitting }) => (
                                    <div>
                                        <div className='row mb-5'>
                                            <div className='col-lg-12 text-center login-heading-style'>
                                                <h1 className='mt-5'>LOGIN</h1>
                                            </div>
                                        </div>
                                        <div className='form'>
                                            <Form>
                                                <div className='form-group form-label'>
                                                    <label
                                                        htmlFor='userEmail'
                                                        className='label-style'>
                                                        Email
                                                    </label>
                                                    <Field
                                                        type='email'
                                                        name='userEmail'
                                                        placeholder='Enter email'
                                                        autoComplete='off'
                                                        className={`mt-2 form-control
                          ${
                              touched.userEmail && errors.userEmail
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                    />

                                                    <ErrorMessage
                                                        component='div'
                                                        name='userEmail'
                                                        className='invalid-feedback'
                                                    />
                                                </div>

                                                <div className='form-group form-label'>
                                                    <label
                                                        htmlFor='userPassword'
                                                        className='mt-3 label-style'>
                                                        Password
                                                    </label>
                                                    <Field
                                                        type='password'
                                                        name='userPassword'
                                                        placeholder='Enter password'
                                                        className={`mt-2 form-control
                          ${
                              touched.userPassword && errors.userPassword
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                    />
                                                    <ErrorMessage
                                                        component='div'
                                                        name='userPassword'
                                                        className='invalid-feedback'
                                                    />
                                                </div>
                                                <div className='text-center'>
                                                    <button
                                                        type='submit'
                                                        className='btn btn-style btn-block mt-4 button'
                                                        disabled={isSubmitting}>
                                                        {!isSubmitting
                                                            ? 'Log In'
                                                            : 'Logging In'}
                                                    </button>
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
                            <div className='text-center'>
                                <p
                                    className='signup-button'
                                    onClick={redirectHandler}>
                                    New User? Create an account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : (
        <SignUp />
    );
}

export default Login;
