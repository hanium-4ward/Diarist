import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import TopNavBar from '../components/TopNavBar';
import CategoryButton from '../components/CategoryButton';
import CheckModal from '../components/CheckModal';
import DrawerModal from '../components/DrawerModal';
import DrawerBottomSheet from '../components/bottomsheet/DrawerBottomSheet';

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
  text-align: left;
  font-size: ${props => 42 * props.theme.widthRatio}px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: ${props => -0.63 * props.theme.widthRatio}px;
  margin-left: ${props => 30 * props.theme.widthRatio}px;
  margin-right: ${props => 30 * props.theme.widthRatio}px;
  margin-top: ${props => 30 * props.theme.widthRatio}px;
  word-break: keep-all;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: ${props => 30 * props.theme.widthRatio}px;
`;

const DrawerWrapper = styled.div`
  display: flex;
  height: calc(100vh - ${props => 350 * props.theme.widthRatio}px);
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const Figure = styled.figure`
  margin-top: ${props => 30 * props.theme.widthRatio}px;
  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Figcaption = styled.figcaption`
  text-align: center;
  font-size: ${props => 26 * props.theme.widthRatio}px;
  font-weight: 400;
  line-height: normal;
  margin-top: ${props => 10 * props.theme.widthRatio}px;
`;

const DrawerImg = styled.img`
  width: 80%;
  height: auto;
`;

function DrawerListPage() {
  const [selectCategory, setSelectCategory] = useState('르네상스');
  const [selectDrawer, setSelectDrawer] = useState('');
  const location = useLocation();
  const categoryArr = ['르네상스', '근대', '현대', '기타'];
  const [openModal, setOpenModal] = useState(false);
  const handleModal = item => {
    setSelectDrawer(item);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const categoryMap = {
    르네상스: 'Renaissance',
    근대: 'Contemporary',
    현대: 'Modern',
    기타: 'Asia',
  };
  const data = [
    {
      artistName: '존 윌리엄',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
    {
      artistName: '존 윌리엄 워',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
    {
      artistName: '존 윌리엄 워터',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
    {
      artistName: '존 윌리엄 워터하',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
    {
      artistName: '존 윌리엄 워터하우',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
    {
      artistName: '존 윌리엄 워터하우스',
      artistPicture: '/drawer.jpg',
      description: '화가 설명 ~~~~~~입니다',
    },
  ];
  const handleCategory = e => {
    setSelectCategory(e.target.innerText);
    const englishCategory = categoryMap[e.target.innerText];
    // 통신 코드 작성
    console.log('Selected Category:', englishCategory);
  };
  console.log(data);

  return (
    <>
      <A11yHidden>화가리스트 페이지</A11yHidden>
      <H2>화가 리스트</H2>
      <div>
        <Div className='flex justify-between'>
          {categoryArr.map(category => (
            <CategoryButton
              key={category}
              isActive={selectCategory === category}
              label={category}
              onClick={e => {
                handleCategory(e);
              }}
            />
          ))}
        </Div>
        <DrawerWrapper>
          {data.map(item => (
            <Figure key={item.artistName}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <DrawerImg src={item.artistPicture} onClick={() => handleModal(item)} />
              <Figcaption>{item.artistName}</Figcaption>
            </Figure>
          ))}
        </DrawerWrapper>
      </div>
      {openModal && (
        <DrawerBottomSheet data={selectDrawer} isOpen={openModal} isClose={closeModal} />
      )}
    </>
  );
}

export default DrawerListPage;
