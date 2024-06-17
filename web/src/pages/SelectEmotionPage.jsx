import React, {useState} from 'react';
import styled from 'styled-components';
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

const EmotionContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => 60 * props.theme.widthRatio}px;
  justify-content: space-between;
  margin-left: ${props => 80 * props.theme.widthRatio}px;
  margin-right: ${props => 80 * props.theme.widthRatio}px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

function SelectEmotionPage() {
  const [selectedEmotion, setSelectedEmotion] = useState('0');

  const handleEmotionClick = id => {
    setSelectedEmotion(id);
  };

  return (
    <Container>
      <div>
        <A11yHidden>감정 선택 페이지</A11yHidden>
        <TopNavBar progress={1} />
        {/* 캘린더 페이지 완성되면 날짜부분 함수 들어갈 예정 */}
        <H2>6월 16일 하루는 어떤</H2>
        <H2>감정이였나요?</H2>
      </div>

      <EmotionContainer>
        <Emotion src='/happy.png' label='행복' onClick={() => handleEmotionClick(1)} />
        <Emotion src='/fun.png' label='기쁨' onClick={() => handleEmotionClick(2)} />
        <Emotion src='/thank.png' label='감사' onClick={() => handleEmotionClick(3)} />
        <Emotion src='/expect.png' label='기대' onClick={() => handleEmotionClick(4)} />
        <Emotion src='/excite.png' label='신남' onClick={() => handleEmotionClick(5)} />
        <Emotion src='/flutter.png' label='설렘' onClick={() => handleEmotionClick(6)} />
        <Emotion src='/sad.png' label='슬픔' onClick={() => handleEmotionClick(7)} />
        <Emotion src='/angry.png' label='화남' onClick={() => handleEmotionClick(8)} />
        <Emotion src='/annoy.png' label='짜증' onClick={() => handleEmotionClick(9)} />
        <Emotion src='/worry.png' label='걱정' onClick={() => handleEmotionClick(10)} />
        <Emotion src='/regret.png' label='후회' onClick={() => handleEmotionClick(11)} />
        <Emotion src='/tired.png' label='피곤' onClick={() => handleEmotionClick(12)} />
      </EmotionContainer>

      <ButtonContainer
        firstLabel='건너뛰기'
        secondLabel='선택완료'
        nextPath='write'
        emotionId={selectedEmotion}
      />
    </Container>
  );
}

export default SelectEmotionPage;
