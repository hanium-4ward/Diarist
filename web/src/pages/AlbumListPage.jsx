import React from 'react';
import ListAlbum from '../components/ListAlbum';

function AlbumListPage() {
  return (
    <div className='px-[4.6875%] pt-5'>
      <h1 className='sr-only'>앨범 리스트 보기 형식 페이지</h1>
      {/* 상단 네비바 */}
      <div className='flex justify-between mb-[14px]'>
        <h2 className='text-[28px]'>나의 앨범</h2>
        <div className='flex justify-between gap-[14px] items-center'>
          <button type='button'>
            <img src='/thumbnail.png' alt='썸네일 보기 형식' className='w-5 h-5' />
          </button>
          <button type='button'>
            <img src='/list.png' alt='리스트 보기 형식' className='w-5 h-5' />
          </button>
          <button
            type='button'
            className='text-xs py-[6px] px-[14px] bg-black text-white rounded-[100px]'
          >
            선택
          </button>
        </div>
      </div>

      {/* 앨범 네비바 */}
      <div className='flex items-center justify-between mb-[16px]'>
        <h3 className='text-[20px]'>
          2024년 <span>봄</span>
        </h3>
        <button type='button' className='flex items-center gap-2'>
          <span>최신순</span>
          <img src='/toggle.svg' alt='' className='w-2' />
        </button>
      </div>

      {/* 앨범 리스트 */}
      <ul className='flex flex-col gap-[14px]'>
        {/* 리스트 한개를 컴포넌트로 만들어 map으롤 렌더링 할 예정 */}
        <li className='flex gap-[14px] items-center'>
          <img src='/diary.webp' alt='일기' className='w-[28%] rounded-[10px]' />
          <div>
            <div className='flex items-center justify-between'>
              <h4 className='text-[24px]'>02.09</h4>
              <div className='text-[14px] text-[#666] flex gap-[14px]'>
                <p>#피카소</p>
                <p>#행복</p>
              </div>
            </div>
            <p className='text-[12px]'>
              오늘은 새해의 첫날입니다. 새해 첫날부터 일기를 쓰는 것은 좋은 습관이 될 것 같습니다.
              오늘은 새해의 첫날입니다.
            </p>
          </div>
        </li>
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
        <ListAlbum />
      </ul>
    </div>
  );
}

export default AlbumListPage;
