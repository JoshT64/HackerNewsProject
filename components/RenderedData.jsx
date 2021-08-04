import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiActions } from '../store/api-state';

const RenderedData = () => {
  const [newStories, setNewStories] = useState([]);
  const [items, setItems] = useState([]);
  const [url, setUrl] = useState([]);
  const dispatch = useDispatch();

  const newStoriesUrl =
    'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

  const loading = useSelector((state) => state.isLoading);
  let storyIds = useSelector((state) => state.data);

  useEffect(() => {
    const fetchNew = () => {
      dispatch(apiActions.loading(true));
      axios
        .get(newStoriesUrl)
        .then((response) => {
          dispatch(apiActions.fetchData(response.data));
          dispatch(apiActions.loading(false));
        })
        .catch((err) => {
          console.error(err);
          dispatch(apiActions.dataFailed());
        });
    };
    fetchNew();
  }, []);
  let itemList = [];

  useEffect(() => {
    [storyIds].forEach((item, idx) => {
      for (let i = 0; i < 100; i++) {
        setItems([item]);
        // console.log(...item);
      }
    });
    console.log(JSON.stringify(items).split(' '));
    // let items = [];
    items.map((item, idx) => {
      let getStoryById = `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`;

      const getStories = () => {
        axios
          .get(getStoryById)
          .then((response) => {
            let dataItems = response.data;
            console.log(dataItems);
            setUrl(dataItems);
            // console.log(itemList);
            // let newStory = JSON.stringify(response.data);
            // for (let i = 0; i < 10; i++) {
            //   // console.log(response.data);
            // }
            // console.log(items);
            // setNewStories(responseData);
          })
          .catch((err) => {
            console.error(err);
          });
      };
      getStories();
      return <li>{}</li>;
    });
  }, [storyIds]);

  const listItems = [url].map((story, idx) => {
    // console.log(x);
    let y = [];
    y.push(story);
    console.log(y[0].by);
    return (
      <li key={idx}>
        {`Title: ${y[0].title}`} {`Author: ${story.by}`}
      </li>
    );
  });

  return (
    <div>
      Data Placeholder:
      {loading ? (
        <h1>=== LOADING ===</h1>
      ) : (
        <h1 className='flex flex-row'>
          <ul>{listItems}</ul>
        </h1>
      )}
    </div>
  );
};

export default RenderedData;
