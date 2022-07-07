import React, { useState } from 'react';
import './Pet.css';
import { Modal, Button } from 'react-bootstrap';
import * as Constants from '../../../constants/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterPet from '../register-pet/RegisterPet';

const Pet = ({
    petId,
    petName,
    petAge,
    petWeight,
    petBreed,
    petGender,
    petHairCoatType,
    petColor,
}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const deletePetHandler = async (e) => {
        await fetch(`${Constants.PETBASEURL}/deletePetInfo?petId=${petId}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                window.location.reload();
                toast.success('Pet Data Successfully Deleted');
            }
        });
    };

    return (
        <>
            <tbody>
                <tr className='pet'>
                    <td>{petName}</td>
                    <td>{petAge}</td>
                    <td>{petWeight}</td>
                    <td>{petBreed}</td>
                    <td>{petGender}</td>
                    <td>
                        <Button
                            type='button'
                            className='btn btn-style btn-block mt-4 button'
                            onClick={handleShow}>
                            Update
                        </Button>
                        <Button
                            type='button'
                            className='btn btn-style btn-block mt-4 button'
                            onClick={deletePetHandler}>
                            Delete
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#08297c' }}>
                        Update pet details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterPet
                        isEdit={true}
                        petId={petId}
                        petName={petName}
                        petAge={petAge}
                        petBreed={petBreed}
                        petWeight={petWeight}
                        petGender={petGender}
                        petHairCoatType={petHairCoatType}
                        petColor={petColor}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-style' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Pet;
