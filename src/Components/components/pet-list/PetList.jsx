import React, { useState, useEffect, useContext } from 'react';
import Pet from '../pet/Pet';
import * as Constants from '../../../constants/constants';
import { AuthContext } from '../../../context/AuthContext';
import { Breadcrumb } from 'react-bootstrap';
import './PetList.css';

function PetList() {
    const [petData, setPetData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const userId = user.userId;

    useEffect(() => {
        try {
            fetch(
                `${Constants.PETBASEURL}/getPetInfoDetailsByUserId?userId=${userId}`,
                { mode: 'cors' },
            )
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const transformedData = data.map((pet) => {
                        return {
                            petId: pet.petId,
                            petName: pet.petName,
                            petAge: pet.petAge,
                            petWeight: pet.petWeight,
                            petBreed: pet.petBreed,
                            petGender: pet.petGender,
                            petHairCoatType: pet.petHairCoatType,
                            petColor: pet.petColor,
                        };
                    });
                    setPetData(transformedData);
                });
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <div className='view-pet-breadcrumb'>
                <Breadcrumb>
                    <Breadcrumb.Item href='/'>
                        <p className='breadcrumb-item'>Home</p>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>View Pet</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='pet-heading-style'>
                <h2>Pet Details</h2>
            </div>
            {isLoading && <div className='pets-loading-text'>Loading...</div>}

            {!isLoading && !petData.length && (
                <div className='no-pet-data-text'>No data to show</div>
            )}
            <div className='pets-list'>
                <table>
                    <tbody>
                        {!isLoading && petData.length > 0 && (
                            <tr>
                                <th className='pet-table-heading'>Name</th>
                                <th className='pet-table-heading'>Age</th>
                                <th className='pet-table-heading'>Weight</th>
                                <th className='pet-table-heading'>Breed</th>
                                <th className='pet-table-heading'>Gender</th>
                                <th className='pet-table-heading' id='actions'>
                                    Actions
                                </th>
                            </tr>
                        )}
                    </tbody>

                    {!isLoading &&
                        petData &&
                        petData.map(
                            (
                                {
                                    petId,
                                    petName,
                                    petAge,
                                    petWeight,
                                    petBreed,
                                    petGender,
                                    petHairCoatType,
                                    petColor,
                                },
                                index,
                            ) => (
                                <Pet
                                    key={index}
                                    petId={petId}
                                    petName={petName}
                                    petAge={petAge}
                                    petWeight={petWeight}
                                    petBreed={petBreed}
                                    petGender={petGender}
                                    petHairCoatType={petHairCoatType}
                                    petColor={petColor}
                                />
                            ),
                        )}
                </table>
            </div>
        </>
    );
}

export default PetList;
