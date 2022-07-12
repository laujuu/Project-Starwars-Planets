import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import '../Table.css';

function FilterByText() {
  const { filter, handleChange } = useContext(MyContext);

  return (
    <div className="filter-by-name">
      {/* {console.log('initial', filter} */}
      <label htmlFor="filterbytext">
        Filter Text:
        {' '}
        <input
          placeholder="Filter by Name"
          data-testid="name-filter"
          type="text"
          id="filterbytext"
          name="filterbytext"
          value={ filter.name }
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default FilterByText;
