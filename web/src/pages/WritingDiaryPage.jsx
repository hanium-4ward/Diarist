import {React, useState} from 'react';
import {useLocation} from 'react-router-dom';
import ButtonContainer from '../components/ButtonContainer';
import TopNavBar from '../components/TopNavBar';

function WritingDiaryPage() {
  // 감정 선택 페이지에서 전달받은 데이터
  const location = useLocation();
  const info = location.state;

  // 글자수 세기
  const [inputCount, setInputCount] = useState(0);
  const [text, setText] = useState('');

  const onInputHandler = e => {
    const inputValue = e.target.value;
    setInputCount(e.target.value.length);
    setText(inputValue);
  };

  return (
    <div className='px-[4.6875%] h-screen'>
      {/* 상단 메뉴 컨테이너 */}
      <h1 className='sr-only'>일기 작성</h1>
      <TopNavBar progress={2} />

      {/* 일기 작성 타이틀 */}
      <div className='text-center mb-[30px]'>
        <h2 className='text-[28px]'>당신의 특별한 일상을</h2>
        <h2 className='text-[28px]'>기록해주세요</h2>
        <p className='text-[16px] font-light'>
          당신의 일기는 선택한 화가의 그림으로 재탄생 됩니다.
        </p>
      </div>
      {/* 일기 작성 */}
      <textarea
        className='border border-[#666] rounded-[20px] p-[28px] w-full text-[16px] h-1/2'
        onChange={onInputHandler}
        value={text}
      />
      <p className='text-right text-[12px] mb-[40px]'>{inputCount}/1000</p>

      {/* 버튼 컨테이너 */}

      <ButtonContainer
        firstLabel='건너뛰기'
        secondLabel='다 적었어요'
        nextPath='selectdrawer'
        emotionId={info.emotionId}
        content={text}
      />
    </div>
  );
}

export default WritingDiaryPage;
