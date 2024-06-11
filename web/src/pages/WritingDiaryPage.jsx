import React, {useState, useEffect} from 'react';
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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const onInputHandler = e => {
    const inputValue = e.target.value;
    setInputCount(inputValue.length);
    setText(inputValue);
  };

  useEffect(() => {
    const handleResize = () => {
      // window.innerHeight가 줄어들면 키보드가 올라온 것으로 간주
      if (window.innerHeight < window.outerHeight - 100) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // 초기 상태 확인
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {/* 상단 메뉴 컨테이너 */}
      <h1>일기 작성</h1>
      <TopNavBar progress={2} />

      {/* 일기 작성 타이틀 */}
      <div>
        <h2>당신의 특별한 일상을</h2>
        <h2>기록해주세요</h2>
        <p>당신의 일기는 선택한 화가의 그림으로 재탄생 됩니다.</p>
      </div>
      {/* 일기 작성 */}
      <textarea onChange={onInputHandler} value={text} />
      <p>{inputCount}/1000</p>

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
