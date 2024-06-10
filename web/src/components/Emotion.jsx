import React from 'react';

function Emotion({src, label, onClick}) {
  return (
    <li className='basis-[24%] mb-[20px]' onClick={onClick}>
      <figure>
        <img src={src} className='mb-[16px]' alt={label} />
        <figcaption>{label}</figcaption>
      </figure>
    </li>
  );
}

export default Emotion;
