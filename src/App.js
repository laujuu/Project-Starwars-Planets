import React from 'react';
import Provider from './context/myProvider';
import PlanetsTable from './components/PlanetsTable';
import './App.css';
// import MyContext from './context/myContext';

// #VQV
function App() {
  // const state = useContext(MyContext);

  return (
    <Provider>
      <PlanetsTable />
    </Provider>
  );
}

export default App;
