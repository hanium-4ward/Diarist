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
  border: 1px solid #000;
  background: #000;
  color: #fff;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  margin-left: ${props => 20 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

function ButtonContainer({
  firstLabel,
  secondLabel,
  nextPath,
  userId,
  diaryDate,
  emotionId,
  content,
  artistId,
}) {
  // firstLabel : 첫번째 버튼 텍스트
  // secondLabel : 두번째 버튼 텍스트
  // nextPath : 다음 페이지 경로
  // userId : 사용자 아이디
  // date : 일기 작성 날짜
  // selectedEmotion : 선택된 감정
  // text : 입력된 텍스트
  // selectedArtist : 선택된 화가

  const navigate = useNavigate();

  return (
    <Container>
      <FirstButton
        type='button'
        onClick={() =>
          navigate(`/${nextPath}`, {
            state: {
              userId,
              emotionId: 13,
              content: '',
              artistId,
              diaryDate,
            },
          })
        }
      >
        {firstLabel}
      </FirstButton>
      <SecondButton
        type='button'
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

export default ButtonContainer;
