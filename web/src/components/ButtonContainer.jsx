import React from 'react';
import {useNavigate} from 'react-router-dom';

function ButtonContainer({
  firstLabel,
  secondLabel,
  nextPath,
  userId,
  diaryDate,
  emotionId,
  content,
  artistId,
}) {
  // firstLabel : 첫번째 버튼 텍스트
  // secondLabel : 두번째 버튼 텍스트
  // nextPath : 다음 페이지 경로
  // userId : 사용자 아이디
  // date : 일기 작성 날짜
  // selectedEmotion : 선택된 감정
  // text : 입력된 텍스트
  // selectedArtist : 선택된 화가

  const navigate = useNavigate();

  return (
    <div className='flex justify-between'>
      <button
        type='button'
        className='w-[47.3%] py-[18px] border border-black rounded-[15px]'
        onClick={() =>
          navigate(`/${nextPath}`, {
            state: {
              userId,
              emotionId: 13,
              content: '',
              artistId,
              diaryDate,
            },
          })
        }
      >
        {firstLabel}
      </button>
      <button
        type='button'
        className='w-[47.3%] py-[18px] border bg-black text-white rounded-[15px]'
        onClick={() =>
          navigate(`/${nextPath}`, {
            state: {
              userId,
              emotionId,
              content,
              artistId,
              diaryDate,
            },
          })
        }
      >
        {secondLabel}
      </button>
    </div>
  );
}

export default ButtonContainer;
