import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  font-weight: 900;
`;

function Calendar() {
  return (
    <div className='flex flex-col'>
      <Div>하얀떡볶이 </Div>
      <Link to='/complete'>완성페이지 이동</Link>
      <Link to='/write'>작성페이지 이동</Link>
      <Link to='/selectdrawer'>화가 선택 페이지 이동</Link>
      <Link to='/thumbnail'>썸네일 보기 페이지 이동</Link>
      <Link to='/list'>리스트 보기 페이지 이동</Link>
      <Link to='emotion'>감정 선택 페이지 이동</Link>
    </div>
  );
}

export default Calendar;
