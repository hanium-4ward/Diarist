import {React, useState, useEffect} from 'react';
import ButtonContainer from '../components/ButtonContainer';
import Emotion from '../components/Emotion';
import TopNavBar from '../components/TopNavBar';

function SelectEmotionPage() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    if (selectedEmotion !== null) {
      console.log(selectedEmotion);
    }
  }, [selectedEmotion]);

  const handleEmotionClick = id => {
    setSelectedEmotion(id);
  };

  return (
    <>
      <TopNavBar progress={1} />
      <div className='mx-[6.5875%]'>
        <h1 className='sr-only'>감정 선택 페이지</h1>
        {/* 상단 메뉴 컨테이너 */}

        {/* 감정 선택 타이틀 */}
        <div className='text-center mb-[30px]'>
          <h2 className='text-[28px]'>당신의 하루는 어떤</h2>
          <h2 className='text-[28px]'>감정이였나요?</h2>
          <p className='text-[16px]'>가장 많이 느낀 감정을 찾아보세요</p>
        </div>

        {/* 감정선택 */}
        <ul className='mx-[5.9125%] flex flex-wrap gap-[14%] text-center'>
          <Emotion src='/emotion.png' label='행복' id={1} onClick={() => handleEmotionClick(1)} />
          <Emotion src='/emotion.png' label='기쁨' id={2} onClick={() => handleEmotionClick(2)} />
          <Emotion src='/emotion.png' label='감사' id={3} onClick={() => handleEmotionClick(3)} />
          <Emotion src='/emotion.png' label='기대' id={4} onClick={() => handleEmotionClick(4)} />
          <Emotion src='/emotion.png' label='신남' id={5} onClick={() => handleEmotionClick(5)} />
          <Emotion src='/emotion.png' label='설렘' id={6} onClick={() => handleEmotionClick(6)} />
          <Emotion src='/emotion.png' label='슬픔' id={7} onClick={() => handleEmotionClick(7)} />
          <Emotion src='/emotion.png' label='화남' id={8} onClick={() => handleEmotionClick(8)} />
          <Emotion src='/emotion.png' label='짜증' id={9} onClick={() => handleEmotionClick(9)} />
          <Emotion src='/emotion.png' label='걱정' id={10} onClick={() => handleEmotionClick(10)} />
          <Emotion src='/emotion.png' label='후회' id={11} onClick={() => handleEmotionClick(11)} />
          <Emotion src='/emotion.png' label='피곤' id={12} onClick={() => handleEmotionClick(12)} />
        </ul>

        <ButtonContainer firstLabel='건너뛰기' secondLabel='선택완료' />
      </div>
    </>
  );
}

export default SelectEmotionPage;
