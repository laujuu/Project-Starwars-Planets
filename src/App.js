import React from 'react';
import Provider from './context/myProvider';
import FilterByText from './components/FilterByText';
import ExtendedFilter from './components/ExtendedFilter';
import PlanetsTable from './components/PlanetsTable';

// import MyContext from './context/myContext';
import './App.css';
import SortFilter from './components/SortFilter';
// #VQV
function App() {
  // const state = useContext(MyContext);

  return (
    <Provider>
      <FilterByText />
      <ExtendedFilter />
      <SortFilter />
      <PlanetsTable />
    </Provider>
  );
}

export default App;
