import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Configure a Document Field Extension link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Configure a Document Field Extension/i);
  expect(linkElement).toBeInTheDocument();
});
