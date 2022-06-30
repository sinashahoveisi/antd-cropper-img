import React from 'react';
import { render, screen } from '@testing-library/react';
import {Hello} from '../src/index';

test('renders learn react link', () => {
  render(<Hello />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
