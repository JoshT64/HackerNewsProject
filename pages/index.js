import Head from 'next/head';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import Header from '../components/Header';
import TestAPI from '../components/TestAPI';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import React, { useState } from 'react';

export default function Home() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='bg-gray-200'>
      <Header />
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <Head>
          <title>Hacker News</title>
          <link rel='icon' href='/favicon.ico' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap'
            rel='stylesheet'
          />
        </Head>
        <div className=' w-full'>
          <TabContext value={value}>
            <AppBar position='sticky'>
              <TabList
                onChange={handleChange}
                aria-label='top posts and new posts tabs'
              >
                <Tab title='tab' name='tab' label='Top Posts' value='1' />
                <Tab label='New Posts' value='2' />
              </TabList>
            </AppBar>
            <TabPanel value='1'>
              <TestAPI
                url={`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`}
              />
            </TabPanel>
            <TabPanel value='2'>
              <TestAPI
                url={`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`}
              />
            </TabPanel>
          </TabContext>
        </div>
        <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'></main>
        <footer className='flex items-center justify-center w-full h-24 border-t-2 border-gray-300'>
          <a
            className='flex items-center justify-center'
            href='https://github.com/HackerNews/API'
            target='_blank'
            rel='noopener noreferrer'
          >
            Hacker News API
            <CallMergeIcon />
          </a>
        </footer>
      </div>
    </div>
  );
}
