import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiActions } from '../store/api-state';
import { useRouter } from 'next/router';
import Link from 'next/link';

const TestAPI = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const newStoriesUrl = props.url;

  // const loading = useSelector((state) => state.isLoading);
  const storyIds = useSelector((state) => state.title);

  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState({ selectedItem: '' });

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

  const fetchAfter = () => {
    storyId.forEach((id) => {
      axios
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

  let sliceStories = stories.slice(0, 100); //Only show 100 results

  const printList = sliceStories.map((story, idx) => {
    let kidsItem;
    let kidsDef = story.kids;
    if (kidsDef !== undefined && story !== null) {
      kidsItem = story.kids.length;
    }

    return (
      <li
        className={
          toggle.selectedItem === idx
            ? 'flex flex-col m-4 flex-wrap items-start bg-gray-300'
            : 'flex flex-col m-4 flex-wrap items-start'
        }
        key={idx}
        onClick={() => setToggle({ selectedItem: idx })}
      >
        <Link
          href={`/${story.id}`}
          onClick={() => dispatch(apiActions.fetchData(story.id))}
          className='bg-gray-300 inline cursor-pointer hover:bg-gray-400 visited:text-gray-500 active:text-gray-500'
        >{`${story.title} `}</Link>
        <div className='flex flex-row self-start'>
          <a
            href={`https://news.ycombinator.com/user?id=${story.by}`}
            className='text-blue-400 hover:text-gray-900'
          >{`${story.by}`}</a>
          <div className='ml-2 mr-2'>
            {kidsItem > 1 ? (
              <p>{kidsItem} Comments</p>
            ) : kidsItem == 1 ? (
              <p>{kidsItem} Comment</p>
            ) : null}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div>
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
        <ul>{printList}</ul>
      )}
    </div>
  );
};

export default TestAPI;
