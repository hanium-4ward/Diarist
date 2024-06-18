import React from 'react';
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
  padding-top: ${props => 66 * props.theme.widthRatio}px;
  animation: ${slideUp} 0.7s ease; /* 애니메이션 적용 */
`;

const H3Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.img`
  width: 5%;
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;
  padding-right: ${props => 30 * props.theme.widthRatio}px;
`;

const H3 = styled.h3`
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
  if (!openModal) return null;
  console.log(data);
  return ReactDOM.createPortal(
    <ModalBackground onClick={closeModal}>
      <ModalContainer>
        <H3Wrapper>
          <H3>{data.artistName}</H3>
          <CloseButton src='/btn_x.png' onClick={closeModal} />
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
