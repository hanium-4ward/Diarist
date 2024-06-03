import React from 'react';
import ReactDOM from 'react-dom';

function DrawerModal({openModal, closeModal}) {
  if (!openModal) return null;

  return ReactDOM.createPortal(
    <div className='fixed inset-0  flex items-center justify-center backdrop-blur'>
      <div className='bg-black p-8 rounded relative text-wh'>
        <button
          type='button'
          onClick={closeModal}
          className='absolute top-2 right-2 bg-red-500  p-1 rounded'
        >
          Close
        </button>
        <p className=''>화가 정보 모달창</p>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
}

export default DrawerModal;
