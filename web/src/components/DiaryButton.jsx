import React from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: ${props => 40 * props.theme.widthRatio}px;
`;

const FirstButton = styled.button`
  width: ${props => 280 * props.theme.widthRatio}px;
  height: ${props => 80 * props.theme.widthRatio}px;
  border-radius: 15px;
  border: 1px solid #000;
  background: #fff;
  color: ${props => (props.disabled ? '#999' : '#000')};
  margin-left: ${props => 30 * props.theme.widthRatio}px;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SecondButton = styled.button`
  width: ${props => 280 * props.theme.widthRatio}px;
  height: ${props => 80 * props.theme.widthRatio}px;
  border-radius: 15px;
  border: ${props => (props.disabled ? '1px solid #999' : '1px solid #000')};
  background: ${props => (props.disabled ? '#999' : '#000')};
  color: #fff;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  margin-left: ${props => 20 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function DiaryButton({
  firstLabel,
  secondLabel,
  nextPath,
  userId,
  diaryDate,
  emotionId,
  content,
  artistId,
  firstDisabled,
  secondDisabled,
  deleteText,
}) {
  const navigate = useNavigate();

  return (
    <Container>
      <FirstButton
        type='button'
        disabled={firstDisabled}
        onClick={() => {
          deleteText();
        }}
      >
        {firstLabel}
      </FirstButton>
      <SecondButton
        type='button'
        disabled={secondDisabled}
        onClick={() =>
          navigate(`/${nextPath}`, {
            state: {
              userId,
              emotionId,
              content,
              artistId,
              diaryDate,
            },
          })
        }
      >
        {secondLabel}
      </SecondButton>
    </Container>
  );
}

export default DiaryButton;
