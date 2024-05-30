import React from 'react';

function DrawCompletedPage() {
  return (
    <>
      <div className='flex'>
        <h1>2026년 3월 28일</h1>
        <button type='button' aria-label='즐겨찾기' />
        <img src='/star.png' alt='즐겨찾기 버튼' />
      </div>

      <img
        src='https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png'
        alt='완성된 그림'
        className='w-10'
      />
      <div className='flex'>
        <figure>
          <img
            alt='놀라움'
            src='https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png'
            className='w-10'
          />
          <figcaption>#놀라움</figcaption>
        </figure>
        <figure>
          <img
            alt='피카소'
            src='https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png'
            className='w-10'
          />
          <figcaption>#피카소</figcaption>
        </figure>
      </div>
      <p>
        1998년 영국 연구소에서 처음 제창된 &quot;음주 파트너십(drinking partnership)&quot;은 유사한
        음주습관이 부부 관계에 긍정적 영향을 줄 가능성이 있다는 개념이다...
      </p>
      <button className='hover:rotate-180 transition delay-75 ' type='button' aria-label='더보기'>
        <img src='/prev.png' alt='더보기 버튼' />
      </button>
      <div>
        <button type='button'>다시그리기</button>
        <button type='button'>저장</button>
      </div>
    </>
  );
}

export default DrawCompletedPage;
