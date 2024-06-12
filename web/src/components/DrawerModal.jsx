import React from 'react';
import ReactDOM from 'react-dom';

function DrawerModal({openModal, closeModal}) {
  if (!openModal) return null;

  return ReactDOM.createPortal(
    <div>
      <div>
        <button type='button' onClick={closeModal}>
          Close
        </button>
        <p className=''>화가 정보 모달창</p>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
}

export default DrawerModal;
