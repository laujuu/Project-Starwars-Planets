import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import '../Table.css';

function FilterByText() {
  const { filterByName, setFilterByName } = useContext(MyContext);

  return (
    <div className="filter-by-name">
      <label htmlFor="filterbytext">
        Filter:
        {' '}
        <input
          placeholder="Filter by Name"
          data-testid="name-filter"
          type="text"
          id="filterbytext"
          name="filterbytext"
          value={ filterByName }
          onChange={ (e) => setFilterByName(e.target.value) }
        />
      </label>
    </div>
  );
}

export default FilterByText;
