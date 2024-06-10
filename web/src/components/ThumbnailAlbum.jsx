import React from 'react';

function ThumbnailAlbum({src, id, onSelect, altText}) {
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect(id);
    }
  };

  return (
    <li className='basis-[30%] mb-[16px] list-none'>
      <button
        type='button'
        onClick={() => onSelect(id)}
        onKeyDown={handleKeyDown}
        className='w-full p-0 bg-transparent border-none cursor-pointer'
        aria-label={`Thumbnail ${id}`}
      >
        <img src={src} alt={altText || `Thumbnail image ${id}`} className='rounded-[10px]' />
      </button>
    </li>
  );
}

export default ThumbnailAlbum;
