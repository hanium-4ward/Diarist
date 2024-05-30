import React from 'react';

function SelectDrawerPage() {
  return (
    <div>
      {/* 페이지 h1 a11yhidden으로 숨길 예정 */}
      <h1>일기 작성</h1>
      {/* 상단 메뉴 컨테이너 */}
      <div className='flex justify-between'>
        <img src='/back.png' alt='뒤로가기' className='' />
        <img src='/close.png' alt='닫기' className='' />
      </div>
      <div className='flex justify-between'>
        <button type='button'>르네상스</button>
        <button type='button'>근대</button>
        <button type='button'>현대</button>
        <button type='button'>동양화</button>
      </div>
      <div className='h-full grid grid-cols-2 place-items-center'>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
        <figure>
          <img src='/drawer.jpg' alt='화가이미지' />
          <figcaption>화가이름</figcaption>
        </figure>
      </div>
      <button type='button'>작성 완료</button>
    </div>
  );
}

export default SelectDrawerPage;
