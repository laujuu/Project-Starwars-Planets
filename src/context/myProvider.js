import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from './myContext';

const INITIAL_STATE = {
  filterByName: {
    name: '',
  },
};

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState({});

  const [filter, setState] = useState(INITIAL_STATE);

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

  const handleChange = ({ target: { value } }) => {
    setState({ filterByName: {
      name: value,
    },
    });
  };

  return (
    <MyContext.Provider value={ { ...planetsData, handleChange, filter } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
