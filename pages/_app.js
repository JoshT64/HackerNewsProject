import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import apiSlice from '../store/api-state';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={apiSlice}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
