import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalBackground = styled.section`
  position: fixed; /* fixed로 설정하여 화면 요소에 상관없이 위치 */
  left: 0;
  bottom: 0; /* 화면의 가장 아래에 위치 */
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* 배경색 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  z-index: 1000; /* 다른 요소들보다 위에 오도록 설정 */
`;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white; /* 컨테이너의 배경색 설정 */
  padding: 20px;
  border-radius: 30px 30px 0 0; /* 모서리 둥글게 설정 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* 그림자 설정 */
`;

const CloseButton = styled.img`
  width: 30px;
`;

function CheckModal({openModal, closeModal}) {
  if (!openModal) return null;

  return ReactDOM.createPortal(
    <ModalBackground onClick={closeModal}>
      <ModalContainer>
        <p>화가 선택 확인 모달창</p>
        <CloseButton src='/btn_x.png' onClick={closeModal} />
      </ModalContainer>
    </ModalBackground>,
    document.getElementById('modal-root'),
  );
}

export default CheckModal;
