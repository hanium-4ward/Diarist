import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';
import useBottomSheet from '../hooks/useBottomSheet';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const ModalBackground = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white; /* 컨테이너의 배경색 설정 */
  border-radius: 30px 30px 0 0; /* 모서리 둥글게 설정 */
  padding-top: ${props => 16 * props.theme.widthRatio}px;
  animation: ${props => (props.isClosing ? slideDown : slideUp)} 0.7s ease;
`;

const H3Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  padding-top: ${props => 66 * props.theme.widthRatio}px;
  color: #000;
  text-align: center;
  font-size: ${props => 40 * props.theme.widthRatio}px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: ${props => -0.6 * props.theme.widthRatio}px;
`;

const ExampleImg = styled.img`
  margin-top: ${props => 40 * props.theme.widthRatio}px;
  border-radius: 20px;
  width: ${props => 300 * props.theme.widthRatio}px;
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
`;

const P = styled.p`
  color: #000;
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: ${props => -0.36 * props.theme.widthRatio}px;
  word-break: keep-all;
`;

const Button = styled.button`
  margin-top: ${props => 40 * props.theme.widthRatio}px;
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
  border-radius: ${props => 15 * props.theme.widthRatio}px;
  background: #000;
  width: ${props => 580 * props.theme.widthRatio}px;
  height: ${props => 80 * props.theme.widthRatio}px;
  color: #fff;
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 500;
  line-height: normal;
`;

function CheckModal({openModal, closeModal, data}) {
  const {sheet} = useBottomSheet();
  if (!openModal) return null;

  const [isClosing, setIsClosing] = useState(false);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  const handleTouchStart = e => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = e => {
    currentYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (startYRef.current < currentYRef.current && currentYRef.current - startYRef.current > 100) {
      setIsClosing(true);
      setTimeout(() => {
        closeModal();
        setIsClosing(false);
      }, 700);
    }
  };

  return ReactDOM.createPortal(
    <ModalBackground>
      <ModalContainer
        isClosing={isClosing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Wrapper>
          <Handle />
        </Wrapper>
        <H3Wrapper>
          <H3>{data.artistName}</H3>
          {/* <CloseButton src='/btn_x.png' onClick={closeModal} /> */}
        </H3Wrapper>
        <ExampleImg src={data.artistPicture} />
        <P>당신이 일기는 위의 그림 풍으로 재탄생됩니다.</P>
        <P>이 화가와의 작업을 원하시면 선택완료 버튼을 눌러주세요</P>
        <Button>선택완료</Button>
      </ModalContainer>
    </ModalBackground>,
    document.getElementById('modal-root'),
  );
}

export default CheckModal;

export const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 80; // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y; // 바텀시트의 세로 길이
