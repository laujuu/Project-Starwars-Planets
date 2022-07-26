import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData'

describe('testes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    render(
      <App />
      )
  })
  afterEach(() => jest.clearAllMocks());
  
  test('se a função de pesquisa funciona corretamente', async () => {
  const searchInput = screen.getByTestId('name-filter');
  expect(searchInput).toBeInTheDocument();

  userEvent.type(searchInput, 'oo');

});

test('se filtragem menor que funciona corretamente', async () => {
  const buttoSelect2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(buttoSelect2, 'population');
  const buttoSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(buttoSelect, 'menor que');
  const value = await screen.findByTestId('value-filter');
  userEvent.type(value, '9000');
  
  const btnFilter = await screen.findByTestId('button-filter');
  userEvent.click(btnFilter);
  await waitFor(() => {
    const pname = screen.getAllByTestId('planet-name')
    expect(pname).toHaveLength(1);
  })

});

test('se filtragem igual a funciona corretamente', async () => {
  const buttoSelect2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(buttoSelect2, 'population');
  const buttoSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(buttoSelect, 'igual a');
  const value = await screen.findByTestId('value-filter');
  userEvent.type(value, '200000');
  
  const btnFilter = await screen.findByTestId('button-filter');
  userEvent.click(btnFilter);

});

test('se o botão de deletar e o filtro maior que funciona corretamente', async () => {
  const buttoSelect2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(buttoSelect2, 'population');
  const buttoSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(buttoSelect, 'maior que');
  const value = await screen.findByTestId('value-filter');
  userEvent.type(value, '9000');
  
  const btnFilter = await screen.findByTestId('button-filter');
  userEvent.click(btnFilter);
  await waitFor(() => {
    const pname = screen.getAllByTestId('planet-name')
    expect(pname).toHaveLength(7);
  })
  
  const btnDel = screen.getByRole('button', {name: /X/i});
  expect(btnDel).toBeInTheDocument();
  userEvent.click(btnDel);
  await waitFor(() => {
    const pname = screen.getAllByTestId('planet-name')
    expect(pname).toHaveLength(10);
  })
});

test('se o botão de deletar todos funciona corretamente', async () => {
  const buttoSelect2 = screen.getByTestId('column-filter');
  userEvent.selectOptions(buttoSelect2, 'population');
  const buttoSelect = screen.getByTestId('comparison-filter');
  userEvent.selectOptions(buttoSelect, 'maior que');
  const value = await screen.findByTestId('value-filter');
  userEvent.type(value, '9000');

  const btnFilter = await screen.findByTestId('button-filter');
  userEvent.click(btnFilter);
  await waitFor(() => {
    const pname = screen.getAllByTestId('planet-name')
    expect(pname).toHaveLength(7);
  })

  const btnDelAll = screen.getByTestId('button-remove-filters');
  expect(btnDelAll).toBeInTheDocument();
  userEvent.click(btnDelAll);
  await waitFor(() => {
    const pname = screen.getAllByTestId('planet-name')
    expect(pname).toHaveLength(10);
  })
});

test('se a função de ASC funciona corretamente', async () => {
  const sortColumn = screen.getByTestId('column-sort');
  userEvent.selectOptions(sortColumn, 'population');
  const btnASC = screen.getByTestId('column-sort-input-asc');
  await waitFor(() => {
    userEvent.click(btnASC);
    
  })
  const btnOrdenar = screen.getByRole('button', {name: /Ordenar/i});
  expect(btnOrdenar).toBeInTheDocument();
  userEvent.click(btnOrdenar);

});

test('se a função de DESC funciona corretamente', async () => {
  const sortColumn = screen.getByTestId('column-sort');
  userEvent.selectOptions(sortColumn, 'population');
  const btnASC = screen.getByTestId('column-sort-input-desc');
  await waitFor(() => {
    userEvent.click(btnASC);
    
  })
  const btnOrdenar = screen.getByRole('button', {name: /Ordenar/i});
  expect(btnOrdenar).toBeInTheDocument();
  userEvent.click(btnOrdenar);
  
});
})

