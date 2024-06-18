import React, {useState, useRef} from 'react';
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
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background: white;
  border-radius: 30px 30px 0 0;
  padding-top: ${props => 66 * props.theme.widthRatio}px;
  padding-left: ${props => 70 * props.theme.widthRatio}px;
  padding-right: ${props => 70 * props.theme.widthRatio}px;
  animation: ${props => (props.isClosing ? slideDown : slideUp)} 0.7s ease;
  overflow: hidden; /* 넘치는 내용을 숨김 */
  box-sizing: border-box; /* 패딩을 포함한 박스 모델 설정 */
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
  justify-content: center;
  align-items: center;
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
      }, 700); // 애니메이션 지속 시간과 맞추기
    }
  };

  if (!openModal) return null;

  return ReactDOM.createPortal(
    <ModalBackground onClick={closeModal}>
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
