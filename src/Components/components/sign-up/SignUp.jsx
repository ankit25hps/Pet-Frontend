import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import './SignUp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../login/Login';
import * as Constants from '../../../constants/constants';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
    userEmail: Yup.string()
        .email('Invalid email address format')
        .required('Email is required'),
    userPassword: Yup.string()
        .required('Password is required')
        .matches(
            /^.*(?=.{8,})(?!.* )((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 8 characters, one uppercase, one number, one special case character and no white spaces',
        ),
    confirmPassword: Yup.string()
        .required('Please confirm your password')
        .oneOf([Yup.ref('userPassword'), null], 'Passwords must match'),
});

function SignUp() {
    const nav = useNavigate();
    const [login, setLogin] = useState(false);

    const redirectHandler = () => {
        setLogin(!login);
        nav('/login');
    };

    return !login ? (
        <div className='container'>
            <div className='row'>
                <div className='col-lg-12'>
                    <Formik
                        initialValues={{
                            userName: '',
                            userEmail: '',
                            userPassword: '',
                            confirmPassword: '',
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={async (
                            values,
                            { setSubmitting, resetForm },
                        ) => {
                            setSubmitting(true);
                            const userName = values.userName;
                            const userEmail = values.userEmail;
                            const userPassword = values.userPassword;
                            const data = {
                                userName,
                                userEmail,
                                userPassword,
                            };
                            try {
                                await fetch(
                                    `${Constants.AUTHENTICATIONBASEURL}/createPetOwnerAccount`,
                                    {
                                        method: 'POST',
                                        mode: 'cors',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Access-Control-Allow-Origin': '*',
                                        },
                                        body: JSON.stringify(data),
                                    },
                                ).then((response) => {
                                    if (response.status == '200') {
                                        toast.success('Sign Up successful');
                                        setLogin(true);
                                    }
                                    if (response.status == '409') {
                                        toast.error(
                                            'Account already exists. Please login.',
                                        );
                                    }
                                });
                                resetForm();
                            } catch (error) {
                                toast.error('Something went wrong');
                            }
                        }}>
                        {({ touched, errors, isSubmitting }) => (
                            <div>
                                <div className='row mb-5'>
                                    <div className='col-lg-12 text-center'>
                                        <h1 className='mt-5 sign-up-heading-style'>
                                            SIGN UP
                                        </h1>
                                    </div>
                                </div>
                                <div className='form'>
                                    <Form>
                                        <div className='form-group form-label'>
                                            <label
                                                htmlFor='userName'
                                                className='label-style'>
                                                Name
                                            </label>
                                            <Field
                                                type='name'
                                                name='userName'
                                                placeholder='Enter name'
                                                autoComplete='off'
                                                className={`mt-2 form-control
                          ${
                              touched.userName && errors.userName
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                            />

                                            <ErrorMessage
                                                component='div'
                                                name='userName'
                                                className='invalid-feedback'
                                            />
                                        </div>

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

                                        <div className='form-group form-label'>
                                            <label
                                                htmlFor='confirmPassword'
                                                className='mt-3 label-style'>
                                                Confirm Password
                                            </label>
                                            <Field
                                                type='password'
                                                name='confirmPassword'
                                                placeholder='Re-enter password'
                                                className={`mt-2 form-control
                          ${
                              touched.confirmPassword && errors.confirmPassword
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                            />
                                            <ErrorMessage
                                                component='div'
                                                name='confirmPassword'
                                                className='invalid-feedback'
                                            />
                                        </div>

                                        <div className='text-center'>
                                            <button
                                                type='submit'
                                                className='btn btn-style btn-block mt-4 button'
                                                disabled={isSubmitting}>
                                                {!isSubmitting
                                                    ? 'Sign Up'
                                                    : 'Signing up'}
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
                        <p className='login-button' onClick={redirectHandler}>
                            Existing User? Login
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Login />
    );
}

export default SignUp;
