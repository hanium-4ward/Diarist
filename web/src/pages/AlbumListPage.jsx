import React from 'react';

function AlbumListPage() {
  return (
    <div>
      <h1>앨범 리스트 보기 형식 페이지</h1> {/* A11YHidden으로 가릴 예정 */}
      <h2>2024년 겨울</h2>
      <div>
        <button type='button'>선택</button>
        <button type='button'>최신순</button>
        <img src='' alt='썸네일 보기 형식' />
        <img src='' alt='리스트 보기 형식' />
      </div>
      <ul>
        <li>
          {/* 리스트 한개를 컴포넌트로 만들어 map으롤 렌더링 할 예정 */}
          <img src='' alt='일기' />
          <div>
            <h3>05.30</h3>
            <div>
              <p>#피카소</p>
              <p>#행복</p>
            </div>
          </div>
          <p>
            오늘은 새해의 첫날입니다. 새해 첫날부터 일기를 쓰는 것은 좋은 습관이 될 것 같습니다.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default AlbumListPage;
