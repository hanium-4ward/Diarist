import React, {useState} from 'react';
import styled, {useTheme} from 'styled-components';
import ButtonContainer from '../components/ButtonContainer';
import Emotion from '../components/Emotion';
import TopNavBar from '../components/TopNavBar';

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

const H2 = styled.h2`
  font-size: ${props => 42 * props.theme.widthRatio}px;
  text-align: center;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.63px;
`;

const P = styled.p`
  text-align: center;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.36px;
  margin-top: ${props => 20 * props.theme.widthRatio}px;
`;

const EmotionContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => 60 * props.theme.widthRatio}px;
  margin-top: ${props => 40 * props.theme.widthRatio}px;
  margin-left: ${props => 80 * props.theme.widthRatio}px;
  margin-right: ${props => 80 * props.theme.widthRatio}px;
`;

function SelectEmotionPage() {
  const theme = useTheme();

  const [selectedEmotion, setSelectedEmotion] = useState('0');

  const handleEmotionClick = id => {
    setSelectedEmotion(id);
  };

  return (
    <>
      <A11yHidden>감정 선택 페이지</A11yHidden>
      <TopNavBar progress={1} />

      <div>
        <H2>당신의 하루는 어떤</H2>
        <H2>감정이였나요?</H2>
        <P>가장 많이 느낀 감정을 찾아보세요</P>

        <EmotionContainer>
          <Emotion src='/emotion.png' label='행복' onClick={() => handleEmotionClick(1)} />
          <Emotion src='/emotion.png' label='기쁨' onClick={() => handleEmotionClick(2)} />
          <Emotion src='/emotion.png' label='감사' onClick={() => handleEmotionClick(3)} />
          <Emotion src='/emotion.png' label='기대' onClick={() => handleEmotionClick(4)} />
          <Emotion src='/emotion.png' label='신남' onClick={() => handleEmotionClick(5)} />
          <Emotion src='/emotion.png' label='설렘' onClick={() => handleEmotionClick(6)} />
          <Emotion src='/emotion.png' label='슬픔' onClick={() => handleEmotionClick(7)} />
          <Emotion src='/emotion.png' label='화남' onClick={() => handleEmotionClick(8)} />
          <Emotion src='/emotion.png' label='짜증' onClick={() => handleEmotionClick(9)} />
          <Emotion src='/emotion.png' label='걱정' onClick={() => handleEmotionClick(10)} />
          <Emotion src='/emotion.png' label='후회' onClick={() => handleEmotionClick(11)} />
          <Emotion src='/emotion.png' label='피곤' onClick={() => handleEmotionClick(12)} />
        </EmotionContainer>

        <ButtonContainer
          firstLabel='건너뛰기'
          secondLabel='선택완료'
          nextPath='write'
          emotionId={selectedEmotion}
        />
      </div>
    </>
  );
}

export default SelectEmotionPage;
