import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import '../Table.css';

function ExtendedFilter() {
  const {
    value,
    setColumn,
    setComparison,
    setValue,
    handleFilters,
    renderColumns,
  } = useContext(MyContext);

  return (
    <div className="filter-by-name">
      <select
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
      >
        { renderColumns() }
      </select>
      <select
        onChange={ (e) => setComparison(e.target.value) }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
        data-testid="value-filter"
        type="text"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          handleFilters();
        } }
      >
        filtrar
      </button>
    </div>
  );
}

export default ExtendedFilter;
