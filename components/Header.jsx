import ComputerIcon from '@material-ui/icons/Computer';

const Header = () => {
  return (
    <header className='flex justify-between border-b-2 border-blue-400 h-16 items-center'>
      <div className='left ml-6'>
        <ComputerIcon />
      </div>
      <div className='right mr-6 '>Right Side</div>
    </header>
  );
};

export default Header;
