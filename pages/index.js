import Head from 'next/head';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import Header from '../components/Header';
import TestAPI from '../components/TestAPI';

export default function Home() {
  return (
    <div className='bg-gray-200'>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <Head>
          <title>Create Next App</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
          <TestAPI />
        </main>
        <footer className='flex items-center justify-center w-full h-24 border-t-2 border-gray-300'>
          <a
            className='flex items-center justify-center'
            href='https://github.com/HackerNews/API'
            target='_blank'
            rel='noopener noreferrer'
          >
            Footer Placeholder
            <CallMergeIcon />
          </a>
        </footer>
      </div>
    </div>
  );
}
