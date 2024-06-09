import React from 'react';

function ListAlbum() {
  return (
    <li className='flex gap-[14px] items-center'>
      <img src='/diary.webp' alt='일기' className='w-[28%] rounded-[10px]' />
      <div>
        <div className='flex items-center justify-between'>
          <h4 className='text-[24px]'>02.09</h4>
          <div className='text-[14px] text-[#666] flex gap-[14px]'>
            <p>#피카소</p>
            <p>#행복</p>
          </div>
        </div>
        <p className='text-[12px]'>
          오늘은 새해의 첫날입니다. 새해 첫날부터 일기를 쓰는 것은 좋은 습관이 될 것 같습니다.
          오늘은 새해의 첫날입니다.
        </p>
      </div>
    </li>
  );
}

export default ListAlbum;
