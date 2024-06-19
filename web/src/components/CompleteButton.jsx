import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => 100 * props.theme.widthRatio}px;
`;

const ResetButton = styled.button`
  width: ${props => 280 * props.theme.widthRatio}px;
  height: ${props => 80 * props.theme.widthRatio}px;
  border-radius: ${props => 15 * props.theme.widthRatio}px;
  border: 1px solid #000;
  background: #fff;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const CheckButton = styled.button`
  width: ${props => 280 * props.theme.widthRatio}px;
  height: ${props => 80 * props.theme.widthRatio}px;
  border-radius: ${props => 15 * props.theme.widthRatio}px;
  border: 1px solid #000;
  background: #000;
  color: #fff;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function CompleteButton({handleRedraw, handleCheck}) {
  return (
    <ButtonWrapper>
      <ResetButton onClick={handleRedraw}>다시그리기</ResetButton>
      <CheckButton onClick={handleCheck}>확인</CheckButton>
    </ButtonWrapper>
  );
}

export default CompleteButton;
