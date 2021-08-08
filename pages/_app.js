import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import { Provider } from 'react-redux';
import apiSlice from '../store/api-state';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={apiSlice}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
