import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import { AppBar, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import he from 'he';
import React from 'react';

const Post = () => {
  const [value, setValue] = useState('1');
  const [commentText, setCommentText] = useState([]);
  const [postData, setPostData] = useState({
    title: '',
    text: '',
    comments: '',
    url: '',
    commentAuthor: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchPost = async () => {
    const postId = window.location.pathname.split('/')[1];

    await axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`
      )
      .then((response) => {
        const responseData = response.data;

        console.log(responseData.text);
        let replacedText = responseData.text;
        let titleData = responseData.title;
        if (responseData.text == undefined) {
          replacedText = '';
        } else {
          replacedText = responseData.text.replace(/<[^>]*>?/gm, '');
        }
        let pointsData;
        if (responseData.score == undefined) {
          pointsData = '';
        } else {
          pointsData = responseData.score;
        }
        let commentData = responseData.kids;
        let url = responseData.url;

        setPostData({
          title: titleData,
          text: replacedText,
          url: url,
          comments: commentData,
          points: pointsData,
        });

        commentData.forEach(async (commentId) => {
          axios
            .get(
              `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
            )
            .then((response) => {
              let commentAuthor = response.data.by;
              let commentResponseData = response.data.text;
              let replacedComment = commentResponseData.replace(
                /<[^>]*>?/gm,
                ''
              );
              let decodedComment = he.decode(replacedComment);
              setCommentText((commentText) => {
                return [...commentText, decodedComment];
              });
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });

    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchPost();
  }, []);

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
          className='animate-spin -mt-1 ml-6 mr-3 h-7 w-7 text-blue-500'
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
            className='opacity-85'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      ) : (
        <div className='m-2 flex-col'>
          <div>
            <a
              href={postData.url}
              className='font-bold ml-2 underline hover:text-purple-800'
            >
              {postData.title}
            </a>
          </div>
          <div className='rounded m-2 round inline align-middle'>
            <p className='text-gray-900 max-w-6xl ml-6 border rounded  border-blue-300 leading-8 pl-4 pr-4 pt-2 pb-2'>
              {postData.text ? postData.text : 'There is no text to display'}
            </p>
          </div>
          <p className='m-2 mb-64'>
            <div className='ml-4 mb-1 underline flex'>
              {postData.comments ? postData.comments.length : null} Comments:{' '}
              <p className='text-gray-500 ml-2'>{postData.points} points</p>
            </div>
            <ul className='text-gray-900 max-w-6xl ml-4 border rounded flex flex-col border-blue-300 leading-8 pl-4 pr-4 pt-2 pb-2'>
              {postData.comments
                ? commentText.map((comment, idx) => {
                    return (
                      <li
                        className='flex items-baseline border border-gray-300'
                        key={idx}
                      >
                        <p className='post-number mr-2 mb-2 opacity-30 ml-1'>
                          {idx + 1 + ':'}
                        </p>
                        {comment}
                      </li>
                    );
                  })
                : 'There are no comments to display.'}
            </ul>
          </p>
        </div>
      )}

      <footer className='flex items-center justify-center w-full h-24 border-t-2 bg-gray-200 border-gray-300 fixed bottom-0 left-0'>
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
