import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';





function SignUpFormModal({showModal, setShowModal, comment}) {
  // const [showModal, setShowModal] = useState(false);

    return (
        <>

        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <SignUpForm setShowModal={setShowModal} comment={comment} />
            </Modal>
        )}
        </>
    );
}

export default SignUpFormModal;
