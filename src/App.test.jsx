import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Gridpinions/i);
  expect(titleElement).toBeDefined();
});

test('renders the board', () => {
  render(<App />);
  const tableElement = screen.getByRole('table');
  expect(tableElement.classList.contains('Board')).toBe(true);
});
