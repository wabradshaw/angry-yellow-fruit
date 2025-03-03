import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test('renders the title', () => {
  render(<Layout />);
  const titleElements = screen.getAllByAltText(/Angry Yellow Fruit/i);
  expect(titleElements.length).toBe(2);
});
