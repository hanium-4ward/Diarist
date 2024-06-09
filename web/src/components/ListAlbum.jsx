import React from 'react';

function ListAlbum({src, date, artist, emotion, content}) {
  return (
    <li className='flex gap-[14px] items-center'>
      <img src={src} alt='일기' className='w-[28%] rounded-[10px]' />
      <div>
        <div className='flex items-center justify-between'>
          <h4 className='text-[24px]'>{date}</h4>
          <div className='text-[14px] text-[#666] flex gap-[14px]'>
            <p>#{artist}</p>
            <p>#{emotion}</p>
          </div>
        </div>
        <p className='text-[12px]'>{content}</p>
      </div>
    </li>
  );
}

export default ListAlbum;
