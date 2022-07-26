import React, { useContext } from 'react';
import context from '../context/myContext';
import '../Table.css';

function Filters() {
  const {
    column,
    setColumn,
    comparison,
    setComparison,
    value,
    setValue,
    filterAndDelete,
    colOpt,
    compOpt,
    handleFilters,
    removeFilter,
    removeAll,
  } = useContext(context);

  return (
    <div>
      <div className="filter-by-name">
        <select
          data-testid="column-filter"
          value={ column }
          onChange={ (e) => setColumn(e.target.value) }
        >
          {colOpt.map((col) => (
            <option key={ col } value={ col }>{ col }</option>)) }
        </select>

        <select
          data-testid="comparison-filter"
          value={ comparison }
          onChange={ (e) => setComparison(e.target.value) }
        >
          {compOpt.map((comp) => (
            <option key={ comp } value={ comp }>{ comp }</option>
          ))}
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilters }
        >
          filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => removeAll() }
        >
          remover todas filtragens
        </button>
      </div>
      <div className="addedFilter">
        {
          filterAndDelete.map((item) => (
            <div
              key={ item }
              data-testid="filter"
            >
              <p>
                {item.column}
                ,
                {' '}
                {item.comparison}
                ,
                {' '}
                {item.value}
              </p>
              <button
                type="button"
                data-testid="btnremvoe"
                id={ item.column }
                onClick={ (e) => removeFilter(e) }
              >
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
export default Filters;
