import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../components/Header';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import Link from 'next/Link';

const Post = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [postData, setPostData] = useState({
    title: '',
    text: '',
    comments: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const fetchPost = () => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then((response) => {
        let commentData = response.data.kids;
        // if (response.data.kids != null) {
        //   commentData = '';
        // }

        let titleData = response.data.title;
        let textData = response.data.text;
        setPostData((prevPostData) => {
          return { title: titleData, text: textData, comments: commentData };
        });
        console.log(response.data.text);
      })
      .catch((err) => {
        console.error(err);
      });
    // setInterval(() => {
    //   if (postData.title === '') {
    //     setIsLoading(false);
    //     console.log('test');

    //     return;
    //   }
    //   clearInterval(i);
    // }, 1500);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  console.log(postData);
  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
      <Header />
      <TabContext value={value}>
        <AppBar position='sticky'>
          <TabList
            onChange={handleChange}
            aria-label='top posts and new posts tabs'
          >
            <Tab
              onClick={() => {
                router.back();
              }}
              label='Back'
              value='1'
            />
          </TabList>
        </AppBar>
        <TabPanel value='1'></TabPanel>
      </TabContext>
      {isLoading ? (
        <svg
          class='animate-spin -ml-1 mr-3 h-7 w-7 text-blue-500'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            class='opacity-85'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : (
        <div>
          <p>Title: {postData.title}</p>
          <p>Text: {postData.text}</p>
          <p>Comments: {postData.comments}</p>
        </div>
      )}

      <footer className='flex items-center justify-center w-full h-24 border-t-2 border-gray-300 fixed bottom-0 left-0'>
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
  );
};

export default Post;
