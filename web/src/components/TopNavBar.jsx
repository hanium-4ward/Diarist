import React from 'react';

function TopNavBar({progress}) {
  return (
    <div>
      <img src='/btn_prev.png' alt='뒤로가기' />
      <span>
        <span>{progress}</span> / 3
      </span>
      <img src='/btn_x.png' alt='닫기' />
    </div>
  );
}

export default TopNavBar;
