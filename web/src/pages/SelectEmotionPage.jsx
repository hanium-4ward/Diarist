import React, {useEffect, useState} from 'react';
import ButtonContainer from '../components/ButtonContainer';
import Emotion from '../components/Emotion';
import TopNavBar from '../components/TopNavBar';

function SelectEmotionPage() {
  const [selectedEmotion, setSelectedEmotion] = useState('0');
  const [widthRatio, setWidthRatio] = useState(1);

  useEffect(() => {
    const FIGMA_WIDTH = 640;
    const updateWidthRatio = () => {
      const newWidthRatio = window.innerWidth / FIGMA_WIDTH;
      setWidthRatio(newWidthRatio);
    };

    // Initial call to set the width ratio
    updateWidthRatio();

    // Update the width ratio on window resize
    window.addEventListener('resize', updateWidthRatio);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateWidthRatio);
    };
  }, []);

  const handleEmotionClick = id => {
    setSelectedEmotion(id);
  };

  return (
    <>
      <h1>감정 선택 페이지</h1>
      <TopNavBar progress={1} />

      <div>
        <div>
          <h2>당신의 하루는 어떤</h2>
          <h2>감정이였나요?</h2>
          <p>가장 많이 느낀 감정을 찾아보세요</p>
        </div>

        <ul>
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
        </ul>

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
