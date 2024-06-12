import React from 'react';

function ThumbnailAlbum({src, id, onSelect, altText}) {
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect(id);
    }
  };

  return (
    <li>
      <button
        type='button'
        onClick={() => onSelect(id)}
        onKeyDown={handleKeyDown}
        aria-label={`Thumbnail ${id}`}
      >
        <img src={src} alt={altText || `Thumbnail image ${id}`} />
      </button>
    </li>
  );
}

export default ThumbnailAlbum;
