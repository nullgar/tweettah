import React from 'react';
import { Modal } from '../../context/Modal';
import CreateComment from '../CreateComment';




function CreateCommentModal({showModal, setShowModal, tweetId}) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>Comment img</button> */}
      {/* {console.log(tweetId)} */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreateComment tweetId={Number(tweetId)} />
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;
