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
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 0;
  width: 100%;
  max-height: 50%;
  background: white;
  border-radius: 30px 30px 0 0;
  padding-top: ${props => 66 * props.theme.widthRatio}px;
  padding-left: ${props => 70 * props.theme.widthRatio}px;
  padding-right: ${props => 70 * props.theme.widthRatio}px;
  animation: ${props => (props.isClosing ? slideDown : slideUp)} 0.7s ease;
  overflow: hidden;
  box-sizing: border-box;
`;

const H3 = styled.h3`
  color: #000;
  text-align: center;
  font-size: ${props => 40 * props.theme.widthRatio}px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: ${props => -0.6 * props.theme.widthRatio}px;
  word-break: keep-all;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Img = styled.img`
  border-radius: 15px;
  width: ${props => 250 * props.theme.widthRatio}px;
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
`;

function DrawerModal({openModal, closeModal, data}) {
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

  if (!openModal) return null;

  return ReactDOM.createPortal(
    <ModalBackground>
      <ModalContainer
        isClosing={isClosing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ImgWrapper>
          <Img src={data.artistPicture} />
          <H3>{data.artistName}</H3>
        </ImgWrapper>
      </ModalContainer>
    </ModalBackground>,
    document.getElementById('modal-root'),
  );
}

export default DrawerModal;
