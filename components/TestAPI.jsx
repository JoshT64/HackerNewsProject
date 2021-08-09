import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiActions } from '../store/api-state';
import Link from 'next/link';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const TestAPI = (props) => {
  const newStoriesUrl = props.url;

  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState({ selectedItem: 0 });

  useEffect(() => {
    fetchNew();
    setIsLoading(true);
  }, []);

  const fetchNew = async () => {
    await axios
      .get(newStoriesUrl)
      .then((response) => {
        setStoryId(response.data);
      })
      .catch((err) => {
        console.error(err);
        dispatch(apiActions.dataFailed());
      });
  };

  useEffect(() => {
    fetchAfter();
    setIsLoading(true);
  }, [storyId]);

  const fetchAfter = async () => {
    storyId.forEach(async (id) => {
      await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
        .then((response) => {
          let responseData = response.data;
          setStories((prevStories) => [...prevStories, responseData]);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, [1500]);
    });
  };

  let sliceStories = stories.slice(0, 90); //Only show 90 results

  return (
    <div>
      {isLoading ? (
        <svg
          className='animate-spin -ml-1 mr-3 h-7 w-7 text-blue-500'
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
        <ul>
          {sliceStories.map((story, idx) => {
            let kidsItem;
            let kidsDef = story.kids;
            if (kidsDef !== undefined && story !== null) {
              kidsItem = story.kids.length;
            }

            return (
              <li
                className={
                  toggle.selectedItem === idx
                    ? 'flex flex-col m-4 ml-20 mr-6 flex-wrap items-start bg-gray-300 list'
                    : 'flex flex-col m-4 ml-20 mr-6 flex-wrap items-start list'
                }
                key={idx}
                onClick={() => setToggle({ selectedItem: idx })}
              >
                <div className='hover:text-gray-500 visited:text-gray-500'>
                  <Link
                    href={`/${story.id}`}
                    className='bg-gray-300 inline cursor-pointer hover:bg-gray-400 visited:text-gray-500 active:text-gray-500'
                  >{`${story.title} `}</Link>
                </div>
                <div className='post-number absolute left-2 mt-2 opacity-30'>
                  {idx + 1}
                </div>
                <div className='post-score absolute left-8 ml-2 mt-2 text-gray-600'>
                  {story.score}
                  <ThumbUpIcon className='mb-2 ml-1 mt-1' fontSize='small' />
                </div>
                <div className='flex flex-row self-start'>
                  <a
                    href={`https://news.ycombinator.com/user?id=${story.by}`}
                    className='text-blue-400 hover:text-blue-500 hover:underline'
                  >{`${story.by}`}</a>
                  <a
                    href={`/${story.id}`}
                    className='ml-2 mr-2 text-gray-400 cursor-pointer hover:underline'
                  >
                    {kidsItem > 1 ? (
                      <p>{kidsItem} Comments</p>
                    ) : kidsItem == 1 ? (
                      <p>{kidsItem} Comment</p>
                    ) : null}
                  </a>
                </div>
              </li>
            );
          })}
          ;
        </ul>
      )}
    </div>
  );
};

export default TestAPI;
