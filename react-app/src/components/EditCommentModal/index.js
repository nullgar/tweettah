import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';



function EditCommentModal({showModal, setShowModal, comment}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Edit Comment</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditComment comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
