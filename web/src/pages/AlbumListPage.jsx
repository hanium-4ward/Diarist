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

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = id => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id],
    );
  };

  return (
    <div>
      {view === 'thumbnail' && <h1>앨범 썸네일 보기 형식 페이지</h1>}
      {view === 'list' && <h1>앨범 리스트 보기 형식 페이지</h1>}
      {/* 상단 네비바 */}
      <div>
        <h2>나의 앨범</h2>
        <div>
          {/* 리스트 보기 형식이 선택 된 경우 */}
          {view === 'list' && (
            <>
              <button type='button' onClick={handleThumbnailView}>
                <img src='/thumbnailFalse.png' alt='썸네일 보기 형식' />
              </button>
              <button type='button' onClick={handleListView}>
                <img src='/listTrue.png' alt='리스트 보기 형식' />
              </button>
            </>
          )}

          {/* 썸네일 보기 형식이 선택 된 경우 */}
          {view === 'thumbnail' && (
            <>
              <button type='button' onClick={handleThumbnailView}>
                <img src='/thumbnailTrue.png' alt='썸네일 보기 형식' />
              </button>
              <button type='button' onClick={handleListView}>
                <img src='/listFalse.png' alt='리스트 보기 형식' />
              </button>
            </>
          )}
          <button
            type='button'
            onClick={() => alert(`Selected Items: ${selectedItems.join(', ')}`)}
          >
            선택
          </button>
        </div>
      </div>

      {/* 앨범 네비바 */}
      <div>
        <h3>
          2024년 <span>봄</span>
        </h3>
        <select>
          <option value='최신순'>최신순</option>
          <option value='오래된순'>오래된순</option>
        </select>
      </div>

      {view === 'thumbnail' && (
        <ul>
          <ThumbnailAlbum src='/diary.webp' id={1} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={2} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={3} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={4} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={5} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={6} onSelect={handleSelect} />
          <ThumbnailAlbum src='/diary.webp' id={7} onSelect={handleSelect} />
        </ul>
      )}

      {/* 앨범 리스트 */}
      {view === 'list' && (
        <ul>
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
            emotion='없음'
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
