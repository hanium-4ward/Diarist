import React from 'react';

function ButtonContainer({firstLabel, secondLabel}) {
  return (
    <div className='flex justify-between'>
      <button type='button' className='w-[47.3%] py-[18px] border border-black rounded-[15px]'>
        {firstLabel}
      </button>
      <button
        type='button'
        className='w-[47.3%] py-[18px] border bg-black text-white rounded-[15px]'
      >
        {secondLabel}
      </button>
    </div>
  );
}

export default ButtonContainer;
