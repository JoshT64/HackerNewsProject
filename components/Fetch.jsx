import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from '../store/api-state';

const url = 'https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty';

const Fetch = async () => {
  const dispatch = useDispatch();

  const apiData = useSelector((state) => state.data);
  const loading = useSelector((state) => state.isLoading);

  dispatch(apiActions.loading(true));
  await axios
    .get(url)
    .then((response) => {
      dispatch(apiActions.fetchData(JSON.stringify(response.data, null, 2)));
      dispatch(apiActions.loading(false));
    })
    .catch((err) => {
      console.error(err);
      dispatch(apiActions.dataFailed());
    });
  console.log(loading);
  return null;
};

export default Fetch;
