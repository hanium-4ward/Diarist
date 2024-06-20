import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalBackground = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  background: white; /* 컨테이너의 배경색 설정 */
  border-radius: ${props => 30 * props.theme.widthRatio}px;
  padding-top: ${props => 16 * props.theme.widthRatio}px;
  padding-left: ${props => 20 * props.theme.widthRatio}px;
  padding-right: ${props => 20 * props.theme.widthRatio}px;
  animation: ${slideUp} 0.7s ease;
`;

const Title = styled.p`
  color: #000;
  text-align: center;
  font-size: ${props => 30 * props.theme.widthRatio}px;
  font-weight: 700;
  line-height: normal;
  letter-spacing: ${props => -0.36 * props.theme.widthRatio}px;
  word-break: keep-all;
  margin-top: ${props => 20 * props.theme.widthRatio}px;
`;

const SubTitle = styled.p`
  color: #585859;
  text-align: center;
  font-size: ${props => 26 * props.theme.widthRatio}px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: ${props => -0.36 * props.theme.widthRatio}px;
  word-break: keep-all;
  margin-top: ${props => 25 * props.theme.widthRatio}px;
`;

const Button = styled.button`
  margin-top: ${props => 40 * props.theme.widthRatio}px;
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
  border-radius: ${props => 15 * props.theme.widthRatio}px;
  background: ${props => (props.$isCancel ? '#CFCFCF' : '#000')};
  width: 48%;
  height: ${props => 80 * props.theme.widthRatio}px;
  color: ${props => (props.$isCancel ? '#000' : '#fff')};
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 500;
  line-height: normal;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => 0 * props.theme.widthRatio}px;
`;

function ResetModal({isOpen, closeModal}) {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <ModalBackground onClick={closeModal}>
      <ModalContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <SVGWrapper>
          <svg
            fill='#CFCFCF'
            viewBox='-1.7 0 20.4 20.4'
            xmlns='http://www.w3.org/2000/svg'
            className='cf-icon-svg'
            width='100'
            height='100'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0' />
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
            <g id='SVGRepo_iconCarrier'>
              <path d='M16.406 10.283a7.917 7.917 0 1 1-7.917-7.917 7.916 7.916 0 0 1 7.917 7.917zM9.48 14.367a1.003 1.003 0 1 0-1.004 1.003 1.003 1.003 0 0 0 1.004-1.003zM7.697 11.53a.792.792 0 0 0 1.583 0V5.262a.792.792 0 0 0-1.583 0z' />
            </g>
          </svg>
        </SVGWrapper>

        <Title>그림을 다시 그리나요?</Title>
        <SubTitle>지금 생성된 그림을 영구 삭제됩니다.</SubTitle>
        <ButtonWrapper>
          {' '}
          <Button onClick={closeModal} $isCancel>
            취소
          </Button>
          <Button>다시 그리기</Button>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackground>,
    document.getElementById('modal-root'),
  );
}

export default ResetModal;
