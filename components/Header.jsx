import ComputerIcon from '@material-ui/icons/Computer';
import { Avatar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useRouter } from 'next/router';
import React from 'react';

const Header = () => {
  const router = useRouter();

  return (
    <header className='flex flex-row justify-between border-blue-400 h-16 items-center'>
      <div
        onClick={() => router.push('/')}
        className='left ml-6 flex items-center cursor-pointer hover:text-gray-500 transition ease-in duration-75'
      >
        <ComputerIcon></ComputerIcon>
        <p className='ml-2 font-mono'>Hacker News</p>
      </div>
      <div className='right mr-6 flex items-center cursor-pointer'>
        <Avatar sizes={'10'} src={'/2.jpg'}></Avatar>
        <ArrowDropDownIcon />
      </div>
    </header>
  );
};

export default Header;
