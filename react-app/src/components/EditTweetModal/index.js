import React from 'react';
import { Modal } from '../../context/Modal';
// import EditComment from './EditComment';
import EditTweet from './EditTweetModal';



function EditTweetModal({showModal, setShowModal, tweet}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Edit Comment</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <EditTweet  setShowModal={setShowModal} tweet={tweet} />
        </Modal>
      )}
    </>
  );
}

export default EditTweetModal;
