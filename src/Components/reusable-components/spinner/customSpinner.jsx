import React from 'react';
import { Spinner } from 'react-bootstrap';
import './customSpinner.css';

function customSpinner() {
    return (
        <div className='spinner-div'>
            <Spinner
                animation='border'
                role='status'
                style={{ color: '#08297c' }}>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
}

export default customSpinner;
