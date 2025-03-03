import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Game from './Game';

test('renders the board', () => {
  render(<Game />);
  const tableElement = screen.getByRole('table');
  expect(tableElement.classList.contains('Board')).toBe(true);
});
