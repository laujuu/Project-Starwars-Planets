import React, { useContext, useState } from 'react';
import context from '../context/myContext';

function SortFilter() {
  const MINUS_ONE = -1;
  const { setNewTest, planetsData, colOpt } = useContext(context);

  //   function handleChange({ target }) {
  //     setOrder({ ...order, [target.name]: target.value });
  //   }

  const [order, setOrder] = useState({ column: 'population', sort: '' });

  // function AlphabeticalOrder() {
  //   let data = [...planetsData];
  //   data = data.sort((a, b) => a.name.localeCompare(b.name));
  //   setNewTest(data);
  // }

  const onClickOrder = () => {
    let sortFilter = [...planetsData];
    if (order.sort === 'ASC') {
      sortFilter = sortFilter.sort((a, b) => {
        if (a[order.column] === 'unknown') return 1;
        if (b[order.column] === 'unknown') return MINUS_ONE;
        return ((a[order.column] - b[order.column]));
      });
      setNewTest(sortFilter);
    } if (order.sort === 'DESC') {
      sortFilter = sortFilter.sort((a, b) => {
        if (a[order.column] === 'unknown') return 1;
        if (b[order.column] === 'unknown') return MINUS_ONE;
        return ((b[order.column] - a[order.column]));
      });
      setNewTest(sortFilter);
    }
  };

  return (
    <div className="filter-by-name">
      <select
        data-testid="column-sort"
        onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
      >
        {colOpt.map((col) => (
          <option key={ col } value={ col }>{ col }</option>)) }
      </select>
      <div>
        <label htmlFor="ASC">
          Ascendente
          <input
            id="asc"
            type="radio"
            data-testid="column-sort-input-asc"
            name="radiobtn"
            value="ASC"
            onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            id="des"
            type="radio"
            data-testid="column-sort-input-desc"
            name="radiobtn"
            value="DESC"
            onChange={ (e) => setOrder({ ...order, sort: e.target.value }) }
          />
        </label>
        <button
          className="order-button"
          data-testid="column-sort-button"
          type="button"
          onClick={ () => onClickOrder() }
        >
          Ordenar
        </button>

      </div>
    </div>
  );
}

export default SortFilter;
