import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { Breadcrumb } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import './RegisterPet.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Constants from '../../../constants/constants';

const LoginSchema = Yup.object().shape({
    petName: Yup.string().required('Pet name is required'),
    petAge: Yup.number().positive().required('Pet age is required'),
    petGender: Yup.string().required('Pet gender is required'),
    petBreed: Yup.string().required('Pet breed is required'),
    petHairCoatType: Yup.string().required('Pet Hair Coat is Required'),
    petColor: Yup.string().required('Pet color is required'),
    petWeight: Yup.number().positive().required('Pet Weight is required'),
});

const initialValues = {
    petName: '',
    petAge: '',
    petGender: '',
    petBreed: '',
    petHairCoatType: '',
    petColor: '',
    petWeight: '',
};

const RegisterPet = ({
    isEdit,
    petId,
    petName,
    petAge,
    petWeight,
    petBreed,
    petGender,
    petHairCoatType,
    petColor,
}) => {
    const { user } = useContext(AuthContext);
    const userId = user.userId;
    let data = {};

    const savedValues = {
        petName: petName,
        petAge: petAge,
        petGender: petGender,
        petBreed: petBreed,
        petHairCoatType: petHairCoatType,
        petColor: petColor,
        petWeight: petWeight,
    };

    return (
        <>
            {!isEdit && (
                <div className='register-pet-breadcrumb'>
                    <Breadcrumb>
                        <Breadcrumb.Item href='/'>
                            <p className='breadcrumb-item'>Home</p>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Register Pet</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            )}
            <div className='container pet-form'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <Formik
                            enableReinitialize={true}
                            initialValues={
                                !isEdit ? initialValues : savedValues
                            }
                            validationSchema={LoginSchema}
                            onSubmit={async (
                                values,
                                { setSubmitting, resetForm },
                            ) => {
                                {
                                    !isEdit
                                        ? (data = { userId, ...values })
                                        : (data = {
                                              userId,
                                              petId,
                                              ...values,
                                          });
                                }

                                try {
                                    await fetch(
                                        `${Constants.PETBASEURL}/addOrUpdatePetInfo`,
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
                                        if (response.ok) {
                                            toast.success(
                                                isEdit
                                                    ? 'Pet data sucessfully updated'
                                                    : 'Pet was successfully registered',
                                            );
                                        }
                                    });
                                    resetForm();
                                    setSubmitting(false);
                                } catch (error) {
                                    toast.error('Something went wrong');
                                } finally {
                                    {
                                        isEdit && window.location.reload();
                                    }
                                }
                            }}>
                            {({ touched, errors, isSubmitting, resetForm }) => (
                                <div>
                                    {!isEdit && (
                                        <div className='row mb-3'>
                                            <div className='col-lg-12 register-pet-heading-style'>
                                                <h3 className='mt-5 text-center'>
                                                    REGISTER PET
                                                </h3>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className={`form ${
                                            isEdit ? 'form-style' : ''
                                        }`}>
                                        <Form>
                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petName'
                                                    className='label-style'>
                                                    Name
                                                </label>
                                                <Field
                                                    type='name'
                                                    name='petName'
                                                    placeholder='Enter name'
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
                                                    htmlFor='petAge'
                                                    className='mt-3 label-style'>
                                                    Age (in years)
                                                </label>
                                                <Field
                                                    type='number'
                                                    name='petAge'
                                                    placeholder='Enter age'
                                                    className={`mt-2 form-control
                          ${
                              touched.petAge && errors.petAge
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />
                                                <ErrorMessage
                                                    component='div'
                                                    name='petAge'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petGender'
                                                    className='label-style'>
                                                    Gender
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='petGender'
                                                    placeholder='Enter gender'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petGender && errors.petGender
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petGender'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petBreed'
                                                    className='label-style'>
                                                    Breed
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='petBreed'
                                                    placeholder='Enter breed'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petBreed && errors.petBreed
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petBreed'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petHairCoatType'
                                                    className='label-style'>
                                                    Hair Coat Type (select one)
                                                </label>

                                                <Field
                                                    as='select'
                                                    name='petHairCoatType'
                                                    className={`mt-2 form-control
                          ${
                              touched.petHairCoatType && errors.petHairCoatType
                                  ? 'is-invalid'
                                  : ''
                          }`}>
                                                    <option defaultValue>
                                                        Select
                                                    </option>
                                                    <option value='long'>
                                                        Long
                                                    </option>
                                                    <option value='medium'>
                                                        Medium
                                                    </option>
                                                    <option value='short'>
                                                        Short
                                                    </option>
                                                    <option value='double-coat'>
                                                        Double-Coat
                                                    </option>
                                                    <option value='curly-coat'>
                                                        Curly-Coat
                                                    </option>
                                                    <option value='shiny-coat'>
                                                        Shiny-Coat
                                                    </option>
                                                    <option value='hairless'>
                                                        Hairless
                                                    </option>
                                                </Field>
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petColor'
                                                    className='label-style'>
                                                    Color
                                                </label>
                                                <Field
                                                    type='text'
                                                    name='petColor'
                                                    placeholder='Enter color'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petColor && errors.petColor
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petColor'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='form-group form-label'>
                                                <label
                                                    htmlFor='petWeight'
                                                    className='label-style'>
                                                    Weight (in kgs)
                                                </label>
                                                <Field
                                                    type='number'
                                                    name='petWeight'
                                                    placeholder='Enter weight'
                                                    autoComplete='off'
                                                    className={`mt-2 form-control
                          ${
                              touched.petWeight && errors.petWeight
                                  ? 'is-invalid'
                                  : ''
                          }`}
                                                />

                                                <ErrorMessage
                                                    component='div'
                                                    name='petWeight'
                                                    className='invalid-feedback'
                                                />
                                            </div>

                                            <div className='text-center'>
                                                {!isEdit && (
                                                    <Button
                                                        type='reset'
                                                        text='clear all'
                                                        className='btn btn-style btn-block mt-4 button'
                                                        disabled={isSubmitting}
                                                        onClick={resetForm}>
                                                        Reset
                                                    </Button>
                                                )}

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
};

export default RegisterPet;
