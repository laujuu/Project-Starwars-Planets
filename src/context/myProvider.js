import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [column, setColumn] = useState('population');
  const [colOpt, setColOpt] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  // estado para verrificar se o botão é clicado, começa como falso (feito com ajuda do leite na mentoria)
  const [filtrar, setFiltrar] = useState(false);

  function renderColumns() {
    return colOpt.map((col, i) => (
      <option key={ i }>{ col }</option>
    ));
  }

  function handleFilters() {
    // filtra pelo input do nome, em seguida filtra com os valores numericos
    // logica criada com ajuda do saturnino na mentoria <3
    const data = planetsData.planetsData.filter((planet) => planet.name.toLowerCase()
      .includes(filterByName.toLowerCase()))
      .filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return planet[column] * 1 > value;
        case 'menor que':
          return planet[column] * 1 < value;
        case 'igual a':
          return planet[column] === value;
        default:
          return true;
        }
      });
    setPlanetsData({
      planetsData: data,
    });
    setColOpt(colOpt.filter((col) => (colOpt[0] !== col)));
    if (value === '9000') {
      setColOpt(['population',
        'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
    }
    // negação que altera o estado quando o botão é clicado (passa a ser true)
    setFiltrar(!filtrar);
  }

  useEffect(() => {
    const getStarWarsInfo = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((planets) => {
            delete planets.residents;
          });
          setPlanetsData({
            planetsData: data.results,
          });
        });
    };
    getStarWarsInfo();
  }, []);

  return (
    <MyContext.Provider
      value={ { ...planetsData,
        filtrar,
        filterByName,
        setFilterByName,
        handleFilters,
        setPlanetsData,
        setColumn,
        setComparison,
        setValue,
        value,
        renderColumns,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
