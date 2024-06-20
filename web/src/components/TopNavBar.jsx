import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import CheckModal from './CheckModal';

const A11yHidden = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${props => 100 * props.theme.widthRatio}px;
`;

const Span = styled.span`
  text-align: center;
  font-size: ${props => 28 * props.theme.widthRatio}px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: ${props => -0.42 * props.theme.widthRatio}px;
`;

const Img = styled.img`
  height: ${props => 33 * props.theme.widthRatio}px;
  padding-left: ${props => 34 * props.theme.widthRatio}px;
  padding-top: ${props => 33.5 * props.theme.widthRatio}px;
  padding-right: ${props => 34 * props.theme.widthRatio}px;
  padding-bottom: ${props => 33.5 * props.theme.widthRatio}px;
`;

const CloseImg = styled.img`
  height: ${props => 33 * props.theme.widthRatio}px;
  padding-left: ${props => 34 * props.theme.widthRatio}px;
  padding-top: ${props => 33.5 * props.theme.widthRatio}px;
  padding-right: ${props => 34 * props.theme.widthRatio}px;
  padding-bottom: ${props => 33.5 * props.theme.widthRatio}px;
`;
const H2 = styled.h2`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: ${props => 42 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: ${props => -0.63 * props.theme.widthRatio}px;
  margin-left: ${props => 30 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
  margin-top: ${props => 20 * props.theme.widthRatio}px;
  word-break: keep-all;
`;
const TitleSpan = styled.span``;

function TopNavBar({page, progress, title1, title2}) {
  // page 페이지 이름
  // progress 단계
  // title1 첫번쨰출
  // title2 두번쨰 줄

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // 뒤로가기 버튼 클릭 시 이동
  const handleBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Header>
        <A11yHidden>{page}</A11yHidden>
        <Img src='/btn_prev.png' alt='뒤로가기' onClick={handleBack} />
        <Span>{progress} / 3</Span>
        <CloseImg src='/btn_x.png' alt='닫기' onClick={openModal} />
      </Header>
      <H2>
        <TitleSpan>{title1}</TitleSpan>
        <TitleSpan>{title2}</TitleSpan>
      </H2>
      {isOpen && <CheckModal isOpen={isOpen} closeModal={closeModal} />}
    </>
  );
}

export default TopNavBar;
