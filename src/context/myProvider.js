import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState({});

  // aasa
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
    <MyContext.Provider value={ planetsData }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.node.isRequired,
};

export default Provider;
