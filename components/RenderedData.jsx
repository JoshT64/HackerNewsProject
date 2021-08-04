import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Fetch from './Fetch';

const RenderedData = () => {
  const loading = useSelector((state) => state.isLoading);
  const data = useSelector((state) => state.data);

  Fetch();

  return (
    <div>
      Data Placeholder:
      {loading ? <h1>=== LOADING ===</h1> : <h1>{data}</h1>}
    </div>
  );
};

export default RenderedData;
