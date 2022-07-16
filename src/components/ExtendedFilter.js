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
  } = useContext(MyContext);

  return (
    <div className="filter-by-name">
      <select
        onChange={ (e) => setColumn(e.target.value) }
        data-testid="column-filter"
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
