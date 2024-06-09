import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const FIGMA_WIDTH = 640;

const useWidthRatio = () => {
  const [widthRatio, setWidthRatio] = useState(1);

  useEffect(() => {
    const updateWidthRatio = () => {
      const devicePixelRatio = window.devicePixelRatio || 1;
      const screenWidth = window.screen.width;
      const logicalWidth = screenWidth / devicePixelRatio;
      const newWidthRatio = logicalWidth / FIGMA_WIDTH;
      setWidthRatio(newWidthRatio);
    };

    updateWidthRatio();
    window.addEventListener('resize', updateWidthRatio);

    return () => {
      window.removeEventListener('resize', updateWidthRatio);
    };
  }, []);

  return widthRatio;
};

const StyledH2 = styled.h2`
  font-size: ${props => props.widthRatio * 24}px;
`;

function DrawCompletedPage() {
<<<<<<< HEAD
  const widthRatio = useWidthRatio();

  return (
    <div>
      <h1>그림 완성 페이지 </h1>

      <div>
        <div>
          <StyledH2 widthRatio={widthRatio}>2026년 3월 28일</StyledH2>
        </div>
=======
  const [px, setPx] = useState(0); // 초기 값 설정
  useEffect(() => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontPx = 20 * devicePixelRatio;
    setPx(fontPx);
  }, []);
  return (
    <>
      <h1 className='sr-only'>그림 완성 페이지 </h1>
      <div className='flex'>
        <h2 style={{fontSize: px}} className=' font-medium tracking-[-0.63px]'>
          2026년 3월 28일
        </h2>
>>>>>>> f1060f8 (styling : PRJO-65 : dpi를 통한 px 적용)
        <button type='button' aria-label='즐겨찾기'>
          <img src='/star.png' alt='즐겨찾기 버튼' />
        </button>
      </div>
      <div>
        <img src='/완성이미지.png' alt='완성된 그림' />
      </div>
      <div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='83'
            height='83'
            viewBox='0 0 83 83'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M83 41C83 35.2505 79.5342 30.3105 74.5778 28.1552C75.4886 26.2976 76 24.2085 76 22C76 14.268 69.732 8 62 8C59.5828 8 57.3086 8.61261 55.3244 9.69104C53.5071 4.06743 48.2285 0 42 0C35.7715 0 30.4929 4.06743 28.6756 9.69104C26.6914 8.61261 24.4172 8 22 8C14.268 8 8 14.268 8 22C8 24.4172 8.61261 26.6914 9.69103 28.6756C4.06743 30.4929 0 35.7715 0 42C0 48.0697 3.86266 53.2373 9.26394 55.1786C8.45236 56.9513 8 58.9228 8 61C8 68.732 14.268 75 22 75C24.4172 75 26.6914 74.3874 28.6756 73.309C30.4929 78.9326 35.7715 83 42 83C48.2285 83 53.5071 78.9326 55.3244 73.309C57.3086 74.3874 59.5828 75 62 75C69.732 75 76 68.732 76 61C76 58.4606 75.3239 56.079 74.1418 54.0256C79.3298 51.976 83 46.9166 83 41Z'
              fill='#FF6FEC'
            />
            <path
              d='M33.1128 43.2635C30.0955 43.2635 27.4186 45.4471 26.9995 46.5C25.9518 48.6058 25.821 53.1189 29.3412 54.6351C33.7414 56.5304 36.8844 54.0033 40.0274 54.0033C43.1704 54.0033 45.0562 56.5304 50.085 55.8986C55.1138 55.2669 56.9996 51.4763 56.9996 48.9493C56.9996 46.4223 55.7424 42 48.8278 42C41.9132 42 42.5418 44.527 40.0274 45.1588C37.513 45.7905 36.8844 43.2635 33.1128 43.2635Z'
              fill='black'
              stroke='black'
              strokeWidth='2'
            />
            <circle cx='32.5' cy='33.5' r='3.5' fill='black' />
            <circle cx='49.5' cy='33.5' r='3.5' fill='black' />
          </svg>
          <span>#놀라움</span>
        </div>
        <figure>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src='/피카소.png' />
          <figcaption>#피카소</figcaption>
        </figure>
      </div>
      <p>
        1998년 영국 연구소에서 처음 제창된 &quot;음주 파트너십(drinking partnership)&quot;은 유사한
        음주습관이 부부 관계에 긍정적 영향을 줄 가능성이 있다는 개념이다...
      </p>
      <div>
        {' '}
        <button type='button' aria-label='더보기'>
          <img src='/prev.png' alt='더보기 버튼' />
        </button>
      </div>

      <div>
        <button type='button'>다시그리기</button>
        <button type='button'>저장</button>
      </div>
    </div>
  );
}

export default DrawCompletedPage;
