import React from 'react';

function TopNavBar({progress}) {
  return (
    <div className='flex items-center justify-between mb-3'>
      <img src='/btn_prev.png' alt='뒤로가기' className='w-[13.28125%]' />
      <span className='text-[18px] font-light'>
        <span className='font-medium'>{progress}</span> / 3
      </span>
      <img src='/btn_x.png' alt='닫기' className='w-[13.28125%]' />
    </div>
  );
}

export default TopNavBar;
