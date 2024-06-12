import React, {useState, useEffect, useReducer} from 'react';
import styled from 'styled-components';
import TopNavBar from '../components/TopNavBar';

const Main = styled.div`
  margin-left: ${props => 30 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
`;

const AccessibilityHidden = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Div = styled.div`
  margin-top: ${props => props.$mt * props.theme.widthRatio}px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: ${props => (props.$justify ? props.$justify : 'center')};
  gap: ${props => props.$gap * props.theme.widthRatio}px;
`;

const H2Container = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const StyledH2 = styled.h2`
  font-size: ${props => 42 * props.theme.widthRatio}px;
  letter-spacing: -0.63px;
  font-weight: 500;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;
`;

const IconImg = styled.img`
  width: ${props => props.$width * props.theme.widthRatio}px;
  border-radius: ${props => (props.$radius ? props.$radius : '')};
`;

const PaintingImg = styled.img`
  width: ${props => 515 * props.theme.widthRatio}px;
  border-radius: 5%;
  flex-shrink: 0;
`;

const Span = styled.span`
  color: #666;
  text-align: center;
  font-size: ${props => 26 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: ${props => -0.39 * props.theme.widthRatio}px;
`;

const Figure = styled.figure`
  gap: ${props => props.$gap * props.theme.widthRatio}px;
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  justify-content: ${props => (props.$justify ? props.$justify : 'center')};
`;

const Figcaption = styled.figcaption`
  color: #666;
  text-align: center;
  font-size: ${props => 26 * props.theme.widthRatio}px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: ${props => -0.39 * props.theme.widthRatio}px;
`;

const Svg = styled.svg`
  width: ${props => 83 * props.theme.widthRatio}px;
`;

const P = styled.p`
  font-size: ${props => 24 * props.theme.widthRatio}px;
  margin-top: ${props => props.$mt * props.theme.widthRatio}px;
  letter-spacing: -0.36px;
  line-height: ${props => 40 * props.theme.widthRatio}px;
`;

const OpenButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: ${props => 10 * props.theme.widthRatio}px;
  border: ${props => 1 * props.theme.widthRatio}px solid rgba(0, 0, 0, 0.5);
  width: ${props => 192 * props.theme.widthRatio}px;
  height: ${props => 40 * props.theme.widthRatio}px;
`;

function DrawCompletedPage() {
  const [px, setPx] = useState(0); // 초기 값 설정
  useEffect(() => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const fontPx = 20 * devicePixelRatio;
    setPx(fontPx);
  }, []);
  return (
    <Main>
      <AccessibilityHidden>그림 완성 페이지 </AccessibilityHidden>
      <Div $mt='100'>
        <H2Container>
          <StyledH2>2026년 3월 28일</StyledH2>
        </H2Container>
        <Button type='button' aria-label='즐겨찾기'>
          {favorite ? (
            <IconImg
              onClick={setFavorite}
              $width='50'
              src='/fullStar.png'
              alt='합쳐진 즐겨찾기 버튼'
            />
          ) : (
            <IconImg onClick={setFavorite} $width='50' src='/star.png' alt='즐겨찾기 버튼' />
          )}
        </Button>
      </Div>
      <Div $mt='38'>
        <PaintingImg src='/완성이미지.png' alt='완성된 그림' />
      </Div>
      <Div $mt='38' $justify='space-evenly'>
        <Div $gap='10'>
          <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 83 83' fill='none'>
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
          </Svg>
          <Span># 놀라움</Span>
        </Div>
        <Figure $gap='10'>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <IconImg $width='83' $radius='100%' src='/피카소.png' />
          <Figcaption># 피카소</Figcaption>
        </Figure>
      </Div>

      <P $mt='38'>{isOpened ? content : content.slice(0, 100)}</P>
      <Div $mt='38'>
        <OpenButton type='button' aria-label='더보기' onClick={setIsOpened}>
          <IconImg $width='30' src='/prev.png' alt='더보기 버튼' />
        </OpenButton>
      </Div>
    </Main>
  );
}

export default DrawCompletedPage;
