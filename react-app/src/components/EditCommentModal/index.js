import React from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment';



function EditCommentModal({showModal, setShowModal, comment}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Edit Comment</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditComment  setShowModal={setShowModal} comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
