import React from 'react';
import {Link} from 'react-router-dom';

function Calendar() {
  return (
    <div className='flex flex-col'>
      <Link to='/complete'>완성페이지 이동</Link>
      <Link to='/write'>작성페이지 이동</Link>
    </div>
  );
}

export default Calendar;
