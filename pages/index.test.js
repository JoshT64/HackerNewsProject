import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // test('Check if list renders on tab click', async () => {
  //   act(() => {
  //     render(<Home />);
  //   });

  //   const buttonElement = screen.getByTitle('tab');

  //   await act(async () => {
  //     userEvent.click(buttonElement);
  //   });
  //   const outputElement = await screen.findAllByRole('listitem');

  //   expect(outputElement).not.toHaveLength(0);
  // });
});
