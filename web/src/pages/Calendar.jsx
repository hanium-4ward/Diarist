import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

function Calendar() {
  return (
    <Div>
      <Link to='/complete'>완성페이지 이동</Link>
      <Link to='/write'>작성페이지 이동</Link>
      <Link to='/selectdrawer'>화가 선택 페이지 이동</Link>
      <Link to='/thumbnail'>썸네일 보기 페이지 이동</Link>
      <Link to='/list'>리스트 보기 페이지 이동</Link>
      <Link to='emotion'>감정 선택 페이지 이동</Link>
      <Link to='/drawerlist'>asdad</Link>
      <Link to='/detail'>일기 상세 페이지</Link>
    </Div>
  );
}

export default Calendar;
