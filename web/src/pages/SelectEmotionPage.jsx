import React from 'react';
import TopNavBar from '../components/TopNavBar';
import Emotion from '../components/Emotion';
import ButtonContainer from '../components/ButtonContainer';

function SelectEmotionPage() {
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
          <Emotion src='/emotion.png' label='행복' />
          <Emotion src='/emotion.png' label='기쁨' />
          <Emotion src='/emotion.png' label='감사' />
          <Emotion src='/emotion.png' label='기대' />
          <Emotion src='/emotion.png' label='신남' />
          <Emotion src='/emotion.png' label='설렘' />
          <Emotion src='/emotion.png' label='슬픔' />
          <Emotion src='/emotion.png' label='화남' />
          <Emotion src='/emotion.png' label='짜증' />
          <Emotion src='/emotion.png' label='걱정' />
          <Emotion src='/emotion.png' label='후회' />
          <Emotion src='/emotion.png' label='피곤' />
        </ul>

        <ButtonContainer firstLabel='건너뛰기' secondLabel='선택완료' />
      </div>
    </>
  );
}

export default SelectEmotionPage;
