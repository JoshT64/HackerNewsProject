import { render, screen } from '@testing-library/react';
import axios from 'axios';
import TestAPI from './TestAPI';

describe('landing page tests', () => {
  test('does fetch render the data on the home page', async () => {
    axios.get = jest.fn();
    axios.get.mockResolvedValueOnce({
      json: async () => [{}],
    });
    const listItems = await screen.findAllByRole(
      'listitem',
      {},
      { timeout: 10000 }
    );
    expect(listItems).not.toHaveLength(0);
  });
});
