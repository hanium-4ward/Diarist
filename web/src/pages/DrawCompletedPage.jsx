import React, {useState, useEffect} from 'react';

function DrawCompletedPage() {
  const [px, setPx] = useState(0); // 초기 값 설정
  useEffect(() => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontPx = (20 * 457) / 160;
    console.log(devicePixelRatio);
    setPx(fontPx);
    console.log(fontPx);
  }, []);
  return (
    <>
      <h1 className=' sr-only'>그림 완성 페이지 </h1>
      <div className='flex'>
        <h2 style={{fontSize: 42}} className='  font-[500] tracking-[-0.63px]'>
          2026년 3월 28일
        </h2>
        <button type='button' aria-label='즐겨찾기'>
          <img className='w-[50px] h-[50px]' src='/star.png' alt='즐겨찾기 버튼' />
        </button>
      </div>

      <img
        src='https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png'
        alt='완성된 그림'
        className='w-10'
      />
      <div className='flex'>
        <figure>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src='https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png'
            className='w-10'
          />
          <figcaption>#놀라움</figcaption>
        </figure>
        <figure>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
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
