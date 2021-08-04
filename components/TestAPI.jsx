import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiActions } from '../store/api-state';

const TestAPI = () => {
  const dispatch = useDispatch();
  const newStoriesUrl =
    'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

  const loading = useSelector((state) => state.isLoading);
  const storyIds = useSelector((state) => state.data);

  const [stories, setStories] = useState([]);
  const [storyId, setStoryId] = useState([]);

  useEffect(() => {
    fetchNew();
  }, []);

  const fetchNew = async () => {
    await axios
      .get(newStoriesUrl, { params: { _limit: 10 } })
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

  useEffect(() => {
    fetchAfter();
  }, [storyId]);

  const fetchAfter = () => {
    storyId.forEach((id) => {
      //   console.log(id);
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
        .then((response) => {
          let responseData = response.data;
          //   console.log(responseData);
          setStories((prevStories) => [...prevStories, responseData]);

          //   console.log(stories + ' hi test' + 1 + 1);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  let sliceStories = stories.slice(0, 100); //Only show 100 results

  const printList = sliceStories.map((story, idx) => {
    return (
      <li className='flex flex-row m-4' key={idx}>
        <p className='mr-2'>Title:</p>
        {`${story.title} `}
        <p className='ml-2 mr-2'>Author:</p>
        {`${story.by}`}
      </li>
    );
  });

  return (
    <div>
      <ul>{printList}</ul>
    </div>
  );
};

export default TestAPI;
