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
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  border-radius: 30px 30px 0 0;
  padding-left: ${props => 70 * props.theme.widthRatio}px;
  padding-right: ${props => 70 * props.theme.widthRatio}px;
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
  word-break: keep-all;
`;

const Img = styled.img`
  border-radius: 15px;
  width: ${props => 250 * props.theme.widthRatio}px;
`;

const P = styled.p`
  color: #000;
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 600;
  line-height: ${props => 36 * props.theme.widthRatio}px;
  letter-spacing: ${props => -0.36 * props.theme.widthRatio}px;
  word-break: keep-all;
`;

const BottomSheetContent = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
`;

function DrawerBottomSheet({data, isOpen, isClose}) {
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
          <ImgWrapper>
            <Img src='/피카소.png' />
            <H3>{data.artistName}</H3>
          </ImgWrapper>

          <P>{data.description}</P>
        </BottomSheetContent>
      </Wrapper>
    </BottomSheetBackground>
  );
}

export default DrawerBottomSheet;
