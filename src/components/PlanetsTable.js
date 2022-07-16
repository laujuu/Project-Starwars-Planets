import React, { useContext } from 'react';
import MyContext from '../context/myContext';

import '../Table.css';
import ExtendedFilter from './ExtendedFilter';

// import MyContext from './context/myContext';
// #VQV
function PlanetsTable() {
  const {
    filterByName,
    planetsData,
    filtrar,
  } = useContext(MyContext);

  function planetsInfo() {
    if (planetsData === undefined) {
      return <p>Loading...</p>;
    }
    if (!filtrar) {
      return (
        <div>
          {
            planetsData.filter((planet) => planet.name.toLowerCase()
              .includes(filterByName.toLowerCase()))
              .map((planets, index) => (
                <tr key={ index }>
                  <td>{planets.name}</td>
                  <td>{planets.rotation_period}</td>
                  <td>{planets.orbital_period}</td>
                  <td>{planets.diameter}</td>
                  <td>{planets.climate}</td>
                  <td>{planets.gravity}</td>
                  <td>{planets.terrain}</td>
                  <td>{planets.surface_water}</td>
                  <td>{planets.population}</td>
                </tr>
              ))
          }
        </div>
      );
    }
    if (filtrar) {
      return (
        <div>
          {
            planetsData
              .map((planet, index) => (
                <tr key={ index }>
                  <td>{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                </tr>
              ))
          }
        </div>
      );
    }
  }

  return (
    <div className="table-div">
      <table>
        <ExtendedFilter />
        <div>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Rotation Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
          {planetsInfo()}
        </div>
      </table>
    </div>
  );
}

export default PlanetsTable;
