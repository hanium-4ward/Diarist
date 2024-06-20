import React, {useState} from 'react';
import styled from 'styled-components';
import Emotion from '../components/Emotion';
import EmotionButton from '../components/EmotionButton';
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
  gap: ${props => 30 * props.theme.widthRatio}px;
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
    setSelectedEmotion(String(id));
  };

  const emotions = [
    {src: '/happy.png', label: '행복', id: 1},
    {src: '/fun.png', label: '기쁨', id: 2},
    {src: '/thank.png', label: '감사', id: 3},
    {src: '/expect.png', label: '기대', id: 4},
    {src: '/excite.png', label: '신남', id: 5},
    {src: '/flutter.png', label: '설렘', id: 6},
    {src: '/sad.png', label: '슬픔', id: 7},
    {src: '/angry.png', label: '화남', id: 8},
    {src: '/annoy.png', label: '짜증', id: 9},
    {src: '/worry.png', label: '걱정', id: 10},
    {src: '/regret.png', label: '후회', id: 11},
    {src: '/tired.png', label: '피곤', id: 12},
  ];

  return (
    <Container>
      <div>
        <A11yHidden>감정 선택 페이지</A11yHidden>
        <TopNavBar progress={1} />
        <H2>6월 16일 하루는 어떤</H2>
        <H2>감정이였나요?</H2>
      </div>

      <EmotionContainer>
        {emotions.map(emotion => (
          <Emotion
            key={emotion.id}
            src={emotion.src}
            label={emotion.label}
            onClick={() => handleEmotionClick(emotion.id)}
            isSelected={selectedEmotion === String(emotion.id)}
          />
        ))}
      </EmotionContainer>

      <EmotionButton
        firstLabel='건너뛰기'
        secondLabel='선택완료'
        nextPath='write'
        emotionId={selectedEmotion}
        firstDisabled={selectedEmotion !== '0'}
        secondDisabled={selectedEmotion === '0'}
      />
    </Container>
  );
}

export default SelectEmotionPage;
