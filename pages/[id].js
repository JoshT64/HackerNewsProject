import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';

const Post = () => {
  const [value, setValue] = useState('1');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [postData, setPostData] = useState({
    title: '',
    text: '',
    comments: '',
    url: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const fetchPost = async () => {
    await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then(async (response) => {
        let titleData = await response.data.title;
        let textData = await response.data.text;
        let commentData = await response.data.kids;
        let url = await response.data.url;
        setPostData((prevPostData) => {
          return {
            title: titleData,
            text: textData,
            comments: commentData,
            url: url,
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });

    setIsLoading(false);
  };

  useEffect(async () => {
    await fetchPost();
  }, [id]);

  useEffect(() => {
    const list = [...postData.comments];
    // console.log(list);
    setComments(() => {
      return list;
    });
    fetchComments();
  }, [postData.comments]);

  // console.log(comments);

  const fetchComments = async () => {
    // console.log('isrunning');
    // console.log(comments);
    comments.forEach(async (commentId) => {
      await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`
        )
        .then((response) => {
          // console.log(response.data);
          let responseData = response.data;
          setCommentText((prevData) => {
            return [...prevData, responseData];
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  // console.log(postData.text);
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
          class='animate-spin -mt-1 ml-6 mr-3 h-7 w-7 text-blue-500'
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
        <div className='m-2 flex-col'>
          <div>
            <a href={postData.url} className='font-bold ml-2 underline'>
              {postData.title}
            </a>
          </div>
          <div className='rounded m-2 round inline align-middle'>
            <p className='text-gray-900 max-w-6xl ml-4 border rounded  border-blue-300 leading-8 pl-4 pr-4 pt-2 pb-2'>
              Text:{' '}
              {postData.text ? postData.text : 'There is no text to display'}
            </p>
          </div>
          <p className='m-2 mb-64'>
            Comments:{' '}
            {postData.comments
              ? commentText.text
              : 'There are no comments to display.'}
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
