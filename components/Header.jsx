import ComputerIcon from '@material-ui/icons/Computer';
import { Avatar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Header = () => {
  return (
    <header className='flex flex-row justify-between border-blue-400 h-16 items-center'>
      <div className='left ml-6'>
        <ComputerIcon></ComputerIcon>
      </div>
      <div className='right mr-6 flex items-center'>
        <Avatar sizes={'10'} src={'/2.jpg'}></Avatar>
        <ArrowDropDownIcon />
      </div>
    </header>
  );
};

export default Header;
