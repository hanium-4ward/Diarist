import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import BottomSheetHeader from './BottomSheetHeader';
import useBottomSheet from '../../hooks/useBottomSheet';

const BottomSheetBackground = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  transition: transform 150ms ease-out;
  transform: ${props => (props.$isOpen ? 'translateY(0)' : 'translateY(100%)')};
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

const BottomSheetContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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

function BottomSheet({data, isOpen, isClose}) {
  const {isOpen: sheetIsOpen, openBottomSheet, closeBottomSheet, refs} = useBottomSheet(isClose);

  useEffect(() => {
    if (isOpen) {
      openBottomSheet();
    } else {
      closeBottomSheet();
      isClose();
    }
  }, [isOpen, openBottomSheet, closeBottomSheet]);
  return (
    <BottomSheetBackground onClick={isClose}>
      <Wrapper
        ref={refs.sheet}
        $isOpen={sheetIsOpen}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <BottomSheetHeader />
        <BottomSheetContent ref={refs.content}>
          <H3>{data.artistName}</H3>
          <ExampleImg src='/피카소.png' />
          <P>당신이 일기는 위의 그림 풍으로 재탄생됩니다.</P>
          <P>이 화가와의 작업을 원하시면 선택완료 버튼을 눌러주세요</P>
          <Button>선택완료</Button>
        </BottomSheetContent>
      </Wrapper>
    </BottomSheetBackground>
  );
}

export default BottomSheet;
