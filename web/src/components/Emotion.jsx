import React from 'react';

function Emotion({src, label}) {
  return (
    <li className='basis-[24%] mb-[20px]'>
      <figure>
        <img src={src} className='mb-[16px]' />
        <figcaption>{label}</figcaption>
      </figure>
    </li>
  );
}

export default Emotion;
