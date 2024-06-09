import {React, useState} from 'react';
import ListAlbum from '../components/ListAlbum';
import ThumbnailAlbum from '../components/ThumbnailAlbum';

function AlbumListPage() {
  const [view, setView] = useState('thumbnail');

  const handleListView = () => {
    setView('list');
  };

  const handleThumbnailView = () => {
    setView('thumbnail');
  };

  return (
    <div className='px-[4.6875%] pt-5'>
      {view === 'thumbnail' && <h1 className='sr-only'>앨범 썸네일 보기 형식 페이지</h1>}
      {view === 'list' && <h1 className='sr-only'>앨범 리스트 보기 형식 페이지</h1>}
      {/* 상단 네비바 */}
      <div className='flex justify-between mb-[14px]'>
        <h2 className='text-[28px]'>나의 앨범</h2>
        <div className='flex justify-between gap-[14px] items-center'>
          {/* 리스트 보기 형식이 선택 된 경우 */}
          {view === 'list' && (
            <>
              <button type='button' onClick={handleThumbnailView}>
                <img src='/thumbnailFalse.png' alt='썸네일 보기 형식' className='w-5 h-5' />
              </button>
              <button type='button' onClick={handleListView}>
                <img src='/listTrue.png' alt='리스트 보기 형식' className='w-5 h-5' />
              </button>
            </>
          )}

          {/* 썸네일 보기 형식이 선택 된 경우 */}
          {view === 'thumbnail' && (
            <>
              <button type='button' onClick={handleThumbnailView}>
                <img src='/thumbnailTrue.png' alt='썸네일 보기 형식' className='w-5 h-5' />
              </button>
              <button type='button' onClick={handleListView}>
                <img src='/listFalse.png' alt='리스트 보기 형식' className='w-5 h-5' />
              </button>
            </>
          )}
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

      {view === 'thumbnail' && (
        <ul className='flex flex-wrap gap-[5%]'>
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
          <ThumbnailAlbum src='/diary.webp' />
        </ul>
      )}

      {/* 앨범 리스트 */}
      {view === 'list' && (
        <ul className='flex flex-col gap-[14px]'>
          <ListAlbum
            src='diary.webp'
            date='02.09'
            artist='피카소'
            emotion='행복'
            content='오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강이다! 오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강'
          />
          <ListAlbum
            src='diary.webp'
            date='02.10'
            artist='레오나르도 다빈치'
            emotion='불행'
            content='오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강이다! 오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강'
          />
          <ListAlbum
            src='diary.webp'
            date='05.10'
            artist='뭉크'
            emotion='우울'
            content='오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강이다! 오늘은 즐거운 하루 행복하자 모두 Fighting! 곧 종강'
          />
        </ul>
      )}
    </div>
  );
}

export default AlbumListPage;
