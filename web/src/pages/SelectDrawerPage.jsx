import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import TopNavBar from '../components/TopNavBar';
import CategoryButton from '../components/CategoryButton';
import CheckModal from '../components/CheckModal';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  margin-top: ${props => 40 * props.theme.widthRatio}px;
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  height: calc(100vh - ${props => 270 * props.theme.widthRatio}px);
  box-sizing: border-box;
`;

const Figure = styled.figure`
  width: 50%;
  height: calc((100% - 40px) / 3);
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
  margin-top: ${props => 15 * props.theme.widthRatio}px;
`;

const DrawerImg = styled.img`
  width: 80%;
  height: auto;
`;

function SelectDrawerPage() {
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
      <TopNavBar page='화가선택 페이지' progress='3' title='함께 작업할 작가를 선택해주세요' />
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
        <CheckModal data={selectDrawer} openModal={openModal} closeModal={closeModal} />
      )}
    </>
  );
}

export default SelectDrawerPage;
