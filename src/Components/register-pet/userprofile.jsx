import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import userpic from "../../user-profile.png";
import { TextField } from "@mui/material";

function RegisterPet() {
    const initialValues = {
        Name: "",
        Age: "",
        Gender: "",
        Breed: "",
        HairCoat: "",
        Color: "",
        Weight: "",
    };
    return (
        <div className='container p-5'>
            <div className='user-pic'>
                <img src={userpic} height={100} width={120} alt='userpic' />
            </div>
            <div className='name'>Rajinder Kaur</div>
            <div className='email'>
                Rajinderkaur@gmail.com
            </div>
            <div>
                <button
                    type='button'
                    class='btn btn-color btn-register btn-sm '>
                    Register Pet
                </button>
            </div>
            <div>
                <button type='button' class='btn btn-color btn-view btn-sm'>
                    View Pet(s)
                </button>
            </div>
        </div>
    );
}

export default RegisterPet;
