import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import '../Table.css';

// import MyContext from './context/myContext';

// #VQV
function PlanetsTable() {
  const { planetsData } = useContext(MyContext);

  function planetsInfo() {
    if (planetsData === undefined) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {
          planetsData.map((planets, index) => (
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

  return (
    <div>
      {console.log('dentro do table', planetsData)}
      <table>
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
      </table>
    </div>
  );
}

export default PlanetsTable;
