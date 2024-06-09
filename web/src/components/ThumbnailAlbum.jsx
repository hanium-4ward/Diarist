import React from 'react';

function ThumbnailAlbum({src}) {
  return (
    <li className='basis-[30%] mb-[16px]'>
      <img src={src} alt='' className='rounded-[10px]' />
    </li>
  );
}

export default ThumbnailAlbum;
