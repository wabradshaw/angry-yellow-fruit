import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Board from './Board';

describe('renders the initial board state', () => {
  test('renders the title', () => {
    render(<Board />);
    const tableElement = screen.getByRole('table');
    expect(tableElement.classList.contains('Board')).toBe(true);
  });
});
