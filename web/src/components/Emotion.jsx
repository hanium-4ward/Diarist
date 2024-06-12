import React from 'react';

function Emotion({src, label, onClick}) {
  return (
    <li onClick={onClick}>
      <figure>
        <img src={src} alt={label} />
        <figcaption>{label}</figcaption>
      </figure>
    </li>
  );
}

export default Emotion;
