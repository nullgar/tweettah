import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import './SignUpFormModal.css'




function SignUpFormModal({showModal, setShowModal, comment}) {
  // const [showModal, setShowModal] = useState(false);

    return (
        <>
        <button className='signup-form-modal-button' onClick={() => setShowModal(true)}>Sign Up</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignUpForm setShowModal={setShowModal} comment={comment} />
            </Modal>
        )}
        </>
    );
}

export default SignUpFormModal;
