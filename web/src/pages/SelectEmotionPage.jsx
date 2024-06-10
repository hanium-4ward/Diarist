import {React, useState, useEffect} from 'react';
import ButtonContainer from '../components/ButtonContainer';
import Emotion from '../components/Emotion';
import TopNavBar from '../components/TopNavBar';

function SelectEmotionPage() {
  // 감정 번호 상태
  const [selectedEmotion, setSelectedEmotion] = useState('0');

  // 감정 선택 시 상태 변경
  const handleEmotionClick = id => {
    setSelectedEmotion(id);
  };

  return (
    <>
      {/* 상단 메뉴 컨테이너 */}
      <h1 className='sr-only'>감정 선택 페이지</h1>
      <TopNavBar progress={1} />

      <div className='mx-[4.6875%]'>
        {/* 감정 선택 타이틀 */}
        <div className='text-center mb-[30px]'>
          <h2 className='text-[28px]'>당신의 하루는 어떤</h2>
          <h2 className='text-[28px]'>감정이였나요?</h2>
          <p className='text-[16px]'>가장 많이 느낀 감정을 찾아보세요</p>
        </div>

        {/* 감정선택 */}
        <ul className='mx-[7.8125%] flex flex-wrap gap-[14%] text-center'>
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

        {/* 버튼 컨테이너, 선택된 감정을 다음페이지(일기 작성페이지)로 전달 */}
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
