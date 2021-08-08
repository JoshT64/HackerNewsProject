import { render, screen } from '@testing-library/react';
import setupTest from '../setupTests';
import React from 'react';
import Home from '.';

describe('Main Page text Render testing', () => {
  test('Check if "Top Posts" gets rendered on homepage', () => {
    render(<Home />);

    const topPostText = screen.getByText('Top Posts', { exact: false });

    expect(topPostText).toBeInTheDocument();
  });

  test('Check if "New Posts" gets rendered on homepage', () => {
    render(<Home />);
    const newPostText = screen.getByText('New Posts', { exact: false });
    expect(newPostText).toBeInTheDocument();
  });

  // test('does fetch render the data on the home page', async () => {
  //   render(<Home />);
  //   const listItems = await screen.findAllByRole(
  //     'listitem',
  //     {},
  //     { interval: 3000 }
  //   );
  //   expect(listItems).not.toHaveLength(0);
  // });
});
