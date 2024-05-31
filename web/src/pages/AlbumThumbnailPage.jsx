import React from 'react';

function AlbumThumbnailPage() {
  return (
    <div>
      <h1>앨범 썸네일 보기 형식 페이지</h1> {/* A11YHidden으로 가릴 예정 */}
      <h2>2024년 겨울</h2>
      <div>
        <button>선택</button>
        <button>최신순</button>
        <img src='' alt='썸네일 보기 형식' />
        <img src='' alt='리스트 보기 형식' />
      </div>
      <img src='' alt='일기' /> {/* 앨범 컴포넌트로 만들어서 map으로 랜더링 할 예정 */}
    </div>
  );
}

export default AlbumThumbnailPage;
