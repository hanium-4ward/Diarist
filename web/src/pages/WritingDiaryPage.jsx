import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styled, {useTheme} from 'styled-components';
import ButtonContainer from '../components/ButtonContainer';
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

const Container = styled.div`
  margin-left: ${props => 30 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
`;

const Textarea = styled.textarea`
  width: ${props => 500 * props.theme.widthRatio}px;
  height: ${props =>
    props.iskeyboardvisible ? 200 * props.theme.widthRatio : 752 * props.theme.widthRatio}px;
  border-radius: 20px;
  border: 1px solid #666;
  overflow: hidden;
  padding: ${props => 40 * props.theme.widthRatio}px;
  margin-top: ${props => 60 * props.theme.widthRatio}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${props => 24 * props.theme.widthRatio}px;
  font-weight: 400;
  line-height: 40px;
  letter-spacing: -0.36px;
  transition: height 0.3s ease;
  outline: none;
`;

const InputP = styled.p`
  text-align: right;
  font-size: ${props => 20 * props.theme.widthRatio}px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.3px;
  margin-bottom: ${props => 60 * props.theme.widthRatio}px;
`;

const Span = styled.span`
  font-size: ${props => 20 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.3px;
`;

function WritingDiaryPage() {
  // 감정 선택 페이지에서 전달받은 데이터
  const theme = useTheme();

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
    <>
      {/* 상단 메뉴 컨테이너 */}
      <A11yHidden>일기 작성</A11yHidden>
      <TopNavBar progress={2} />
      <Container>
        {/* 일기 작성 타이틀 */}
        <div>
          <H2>당신의 특별한 일상을</H2>
          <H2>기록해주세요</H2>
          <P>당신의 일기는 선택한 화가의 그림으로 재탄생 됩니다.</P>
        </div>
        {/* 일기 작성 */}
        <Textarea
          onChange={onInputHandler}
          value={text}
          iskeyboardvisible={isKeyboardVisible ? 'true' : undefined}
        />
        <InputP>
          {inputCount}
          <Span>/1000</Span>
        </InputP>
      </Container>
      {/* 버튼 컨테이너 */}
      <ButtonContainer
        firstLabel='건너뛰기'
        secondLabel='다 적었어요'
        nextPath='selectdrawer'
        emotionId={info.emotionId}
        content={text}
      />
    </>
  );
}

export default WritingDiaryPage;
