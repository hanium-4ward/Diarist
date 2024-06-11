import React from 'react';

function ListAlbum({src, date, artist, emotion, content}) {
  return (
    <li>
      <img src={src} alt='일기' />
      <div>
        <div>
          <h4>{date}</h4>
          <div>
            <p>#{artist}</p>
            <p>#{emotion}</p>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </li>
  );
}

export default ListAlbum;
