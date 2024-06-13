import React from 'react';
import styled from 'styled-components';

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
  letter-spacing: -0.42px;
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
function TopNavBar({progress}) {
  return (
    <Header>
      <Img src='/btn_prev.png' alt='뒤로가기' />
      <Span>
        <span>{progress}</span> / 3
      </Span>
      <CloseImg src='/btn_x.png' alt='닫기' />
    </Header>
  );
}

export default TopNavBar;
