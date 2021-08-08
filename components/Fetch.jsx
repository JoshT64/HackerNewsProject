// import React from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { apiActions } from '../store/api-state';

// const url =
//   'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

// const fetch = () => {
//   const dispatch = useDispatch();

//   const apiData = useSelector((state) => state.data);
//   const loading = useSelector((state) => state.isLoading);

//   dispatch(apiActions.loading(true));
//   axios
//     .get(url)
//     .then((response) => {
//       dispatch(apiActions.fetchData(response.data));
//       dispatch(apiActions.loading(false));
//     })
//     .catch((err) => {
//       console.error(err);
//       dispatch(apiActions.dataFailed());
//     });
//   console.log('test');
//   return null;
// };
// fetch();
// export default fetch;
