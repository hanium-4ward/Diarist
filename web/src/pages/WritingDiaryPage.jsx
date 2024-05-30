import React from 'react';

function WritingDiaryPage() {
  return (
    <div className='px-[30px]'>
      {/* 페이지 h1 a11yhidden으로 숨길 예정 */}
      <h1>일기 작성</h1>
      {/* 상단 메뉴 컨테이너 */}
      <div className='flex justify-between'>
        <img src='./../../public/back.png' alt='뒤로가기' className='' />
        <img src='./../../public/close.png' alt='닫기' className='' />
      </div>
      <h2>당신의 특별한 일상을 기록해주세요</h2>
      <p>당신의 일기는 선택한 화가의 그림으로 재탄생 됩니다.</p>
      <textarea className='' />
      {/* 버튼 컨테이너 */}
      <div className='flex justify-between'>
        <button>건너뛰기</button>
        <button>다 적었어요</button>
      </div>
    </div>
  );
}

export default WritingDiaryPage;
