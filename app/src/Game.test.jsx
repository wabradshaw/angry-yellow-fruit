import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders the title', () => {
  render(<Game />);
  const titleElements = screen.getAllByAltText(/Angry Yellow Fruit/i);
  expect(titleElements.length).toBe(2);
});

test('renders the board', () => {
  render(<Game />);
  const tableElement = screen.getByRole('table');
  expect(tableElement.classList.contains('Board')).toBe(true);
});
