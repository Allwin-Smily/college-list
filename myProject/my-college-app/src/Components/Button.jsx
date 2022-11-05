import * as React from 'react';
// import Button from '@mui/material/Button';

export default function BasicButtons({title, handleAction}) {
    return (
        <button className='text-[#fff] text-[16px] leading-[28px] font-semibold flex items-center justify-center border-transparent rounded transition-all duration-300 ease-in py-[7px] px-[14px] bg-[#4abd5d] hover:bg-[#1DAD34]' onClick={handleAction}>{title}</button>
    );
}