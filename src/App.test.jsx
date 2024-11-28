import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the title', () => {
  render(<App />);
  const titleElement = screen.getByText(/guizz/i);
  expect(titleElement).toBeDefined();
});
