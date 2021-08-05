import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiActions } from '../store/api-state';
//make website look like iphone messages
const TestAPI = () => {
  const dispatch = useDispatch();
  const newStoriesUrl =
    'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

  const loading = useSelector((state) => state.isLoading);
  const storyIds = useSelector((state) => state.data);

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
        // dispatch(apiActions.fetchData(response.data));
        dispatch(apiActions.loading(false));
        setStoryId(response.data);
      })
      .catch((err) => {
        console.error(err);
        dispatch(apiActions.dataFailed());
      });
  };

  useEffect(async () => {
    await fetchAfter();
    setIsLoading(true);
  }, [storyId]);

  const fetchAfter = async () => {
    storyId.forEach(async (id) => {
      //   console.log(id);
      await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
        .then((response) => {
          let responseData = response.data;
          //   console.log(responseData);
          setStories((prevStories) => [...prevStories, responseData]);

          //   console.log(stories + ' hi test' + 1 + 1);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, [1500]);
    });
  };

  let sliceStories = stories.slice(0, 100); //Only show 100 results

  const printList = sliceStories.map((story, idx) => {
    let kids;
    if (story.kids !== undefined) {
      // console.log(story.kids);
      kids = story.kids.length;
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
        {console.log(toggle)}
        <a
          href={`${story.url}`}
          className='bg-gray-300 inline cursor-pointer hover:bg-gray-400 '
        >{`${story.title} `}</a>
        <div className='flex flex-row self-start'>
          <a
            href={`https://news.ycombinator.com/user?id=${story.by}`}
            className='text-blue-400 hover:text-gray-900'
          >{`${story.by}`}</a>
          <div className='ml-2 mr-2'>
            {kids > 1 ? (
              <p>{kids} Comments</p>
            ) : kids == 1 ? (
              <p>{kids} Comment</p>
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
            class='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            stroke-width='4'
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
