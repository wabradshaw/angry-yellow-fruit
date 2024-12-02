import { expect, test } from 'vitest';
import { render, screen, getAllByRole, getByRole, getByText} from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Board from './Board';
import opinions from './cards/testOpinions.json';
import descriptions from './cards/testDescriptions.json';
import themes from './cards/testThemes.json';

describe('renders the initial board state', () => { 
  test('renders the title', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const tableElement = screen.getByRole('table');
    expect(tableElement.classList.contains('Board')).toBe(true);
  });

  test('renders the theme', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const theme = getByText(board, /(MMM)|(NNN)|(OOO)/i);
    expect(theme).toBeDefined();
  });

  test('renders three columns if the scale is three', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');
    expect(columnElements.length).toBe(3);
  });

  test('renders three rows if the scale is three', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');
    expect(rowElements.length).toBe(3);
  });

  test('renders ten cells if the scale is three, one of which is the theme', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const cellElements = getAllByRole(board, 'cell');
    expect(cellElements.length).toBe(10);
    expect(cellElements.filter((cell) => cell.className === 'Theme').length).toBe(1);
  });

  test('renders five columns if the scale is five', () => {
    render(<Board scale={5} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');
    expect(columnElements.length).toBe(5);
  });

  test('renders five rows if the scale is five', () => {
    render(<Board scale={5} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');
    expect(rowElements.length).toBe(5);
  });

  test('renders 26 cells if the scale is five, one of which is the theme', () => {
    render(<Board scale={5} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const cellElements = getAllByRole(board, 'cell');
    expect(cellElements.length).toBe(26);
    expect(cellElements.filter((cell) => cell.className === 'Theme').length).toBe(1);
  });
});

describe('opinions handled correctly', () => {
  test('all five opinions are displayed on request', () => {
    render(<Board scale={5} opinionsList={opinions} descriptionsList={descriptions} themesList={themes} themesList={themes}/>);
    expect(screen.getByText('ZZZ')).toBeDefined();
    expect(screen.getByText('YYY')).toBeDefined();
    expect(screen.getByText('XXX')).toBeDefined();
    expect(screen.getByText('WWW')).toBeDefined();
    expect(screen.getByText('VVV')).toBeDefined();    
  });

  test('three of five opinions are displayed when three are requested', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const opinionElements = screen.getAllByText(/(ZZZ)|(YYY)|(XXX)|(WWW)|(VVV)/i)
    expect(opinionElements.length).toBe(3);
  });

  test('clicking the first cell changes the first opinion', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const newHeader = getAllByRole(board, 'columnheader')[0].textContent;
    expect(validOpinions).toContain(newHeader);
  });

  test('clicking the fourth cell in a 3x3  changes the second opinion', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /4/i}))
    
    const newHeader = getAllByRole(board, 'columnheader')[1].textContent;
    expect(validOpinions).toContain(newHeader);
  });

  test('clicking the eighth cell in a 3x3 changes the third opinion', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /8/i}))
    
    const newHeader = getAllByRole(board, 'columnheader')[2].textContent;
    expect(validOpinions).toContain(newHeader);
  });

  test('clicking the eighth cell in a 4x4 changes the second opinion', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={4} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /^8$/i}))
    
    const newHeader = getAllByRole(board, 'columnheader')[1].textContent;
    expect(validOpinions).toContain(newHeader);
  });

  test('clicking the a cell twice changes it twice', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const secondHeader = getAllByRole(board, 'columnheader')[0].textContent;
    expect(validOpinions).toContain(secondHeader);
    validOpinions = validOpinions.filter((e) => e != secondHeader);

    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const thirdHeader = getAllByRole(board, 'columnheader')[0].textContent;
    expect(validOpinions).toContain(thirdHeader);
  });

  test('clicking the a cell once the available list is empty means it can cycle through old values including the one that the cell originally had (but not the current one)', async () => {
    let validOpinions = ['ZZZ','YYY','XXX','WWW','VVV'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const columnElements = getAllByRole(board, 'columnheader');

    const selected = columnElements.map((el) => el.textContent);
    validOpinions = validOpinions.filter((e) => !selected.includes(e));

    const firstHeader = getAllByRole(board, 'columnheader')[0].textContent;

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}));
    
    const secondHeader = getAllByRole(board, 'columnheader')[0].textContent;
    expect(validOpinions).toContain(secondHeader);
    validOpinions = validOpinions.filter((e) => e != secondHeader);

    await user.click(getByRole(board, 'button', {name: /1/i}));
    
    const thirdHeader = getAllByRole(board, 'columnheader')[0].textContent;
    expect(validOpinions).toContain(thirdHeader);
    validOpinions = validOpinions.filter((e) => e != thirdHeader);

    expect(validOpinions.length).toBe(0);
    validOpinions = [firstHeader, secondHeader];
    for(let i = 0; i < 2; i++){
      await user.click(getByRole(board, 'button', {name: /1/i}));
      let header = getAllByRole(board, 'columnheader')[0].textContent;
      expect(validOpinions).toContain(header);
      validOpinions = validOpinions.filter((e) => e != header);
    }
    expect(validOpinions.length).toBe(0);
    
  });
}); 

describe('descriptions handled correctly', () => {
  test('all five descriptions are displayed on request', () => {
    render(<Board scale={5} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    expect(screen.getByText('AAA')).toBeDefined();
    expect(screen.getByText('BBB')).toBeDefined();
    expect(screen.getByText('CCC')).toBeDefined();
    expect(screen.getByText('DDD')).toBeDefined();
    expect(screen.getByText('EEE')).toBeDefined();    
  });

  test('three of five descriptions are displayed when three are requested', () => {
    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const descriptionElements = screen.getAllByText(/(AAA)|(BBB)|(CCC)|(DDD)|(EEE)/i)
    expect(descriptionElements.length).toBe(3);
  });

  test('clicking the first cell changes the first description', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const newHeader = getAllByRole(board, 'rowheader')[0].textContent;
    expect(validDescriptions).toContain(newHeader);
  });

  test('clicking the fifth cell in a 3x3 changes the second description', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /5/i}))
    
    const newHeader = getAllByRole(board, 'rowheader')[1].textContent;
    expect(validDescriptions).toContain(newHeader);
  });

  test('clicking the sixth cell in a 3x3 changes the third description', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /6/i}))
    
    const newHeader = getAllByRole(board, 'rowheader')[2].textContent;
    expect(validDescriptions).toContain(newHeader);
  });

  test('clicking the sixth cell in a 4x4 changes the second description', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={4} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /^6$/i}))
    
    const newHeader = getAllByRole(board, 'rowheader')[1].textContent;
    expect(validDescriptions).toContain(newHeader);
  });

  test('clicking the a cell twice changes it twice', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const secondHeader = getAllByRole(board, 'rowheader')[0].textContent;
    expect(validDescriptions).toContain(secondHeader);
    validDescriptions = validDescriptions.filter((e) => e != secondHeader);

    await user.click(getByRole(board, 'button', {name: /1/i}))
    
    const thirdHeader = getAllByRole(board, 'rowheader')[0].textContent;
    expect(validDescriptions).toContain(thirdHeader);
  });

  test('clicking the a cell once the available list is empty means it can cycle through old descriptions including the one that the cell originally had  (but not the current one)', async () => {
    let validDescriptions = ['AAA','BBB','CCC','DDD','EEE'];

    render(<Board scale={3} opinionsList={opinions} descriptionsList={descriptions} themesList={themes}/>);
    const board = screen.getByRole('table');
    const rowElements = getAllByRole(board, 'rowheader');

    const selected = rowElements.map((el) => el.textContent);
    validDescriptions = validDescriptions.filter((e) => !selected.includes(e));

    const firstHeader = getAllByRole(board, 'rowheader')[0].textContent;

    const user = userEvent.setup();
    await user.click(getByRole(board, 'button', {name: /1/i}));
    
    const secondHeader = getAllByRole(board, 'rowheader')[0].textContent;
    expect(validDescriptions).toContain(secondHeader);
    validDescriptions = validDescriptions.filter((e) => e != secondHeader);

    await user.click(getByRole(board, 'button', {name: /1/i}));
    
    const thirdHeader = getAllByRole(board, 'rowheader')[0].textContent;
    expect(validDescriptions).toContain(thirdHeader);
    validDescriptions = validDescriptions.filter((e) => e != thirdHeader);

    expect(validDescriptions.length).toBe(0);
    validDescriptions = [firstHeader, secondHeader];
    for(let i = 0; i < 2; i++){
      await user.click(getByRole(board, 'button', {name: /1/i}));
      const header = getAllByRole(board, 'rowheader')[0].textContent;
      expect(validDescriptions).toContain(header);
      validDescriptions = validDescriptions.filter((e) => e != header);
    }
    expect(validDescriptions.length).toBe(0);
  });
}); 