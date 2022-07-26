import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './myContext';

function Provider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [test, setNewTest] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState([0]);
  const [filterAndDelete, setFilterAndDelete] = useState([]);
  const [colOpt, setColOpt] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [compOpt, setCompOpt] = useState(['maior que', 'menor que', 'igual a']);
  // const [filtar, setFiltar] = useState(false);

  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    // filtra ao digitar o nome do planeta
    const data = planetsData.filter((planet) => planet.name.includes(filterByName));
    setNewTest(data);
  }, [filterByName, planetsData]);

  function handleFilters() {
    // const data = planetsData.filter((planet) => planet.name.toLowerCase()
    //   .includes(filterAndDelete));
    // let data = [...planetsData];
    // data = dataFiltered.filter((planet) => {
    //   if (comparison === 'maior que') {
    //     return Number(planet[column]) > Number(value);
    //   }
    //   if (comparison === 'menor que') {
    //     return Number(planet[column]) < Number(value);
    //   }
    //   if (comparison === 'igual a') {
    //     return Number(planet[column]) === Number(value);
    //   }
    //   return null;
    // });
    // setNewTest(data);

    // remove coluna do select ao clicar em filtrar
    const columnFiltered = colOpt.filter((col) => (col !== column));
    setColOpt(columnFiltered);
    setColumn(...columnFiltered);
    // reseta o valor inicial para 0
    setValue(0);
    // adiciona o filtro na lista de filtro
    setFilterAndDelete((prev) => [...prev, { column, comparison, value }]);

    // negação que altera o estado quando o botão é clicado (passa a ser true)
    // setFiltrar(!filtrar);
  }

  const removeFilter = ({ target }) => {
    // remove o filtro quando ao clicar no botão 'X'
    setFilterAndDelete(
      filterAndDelete.filter((item) => item.column !== target.id),
    );
    // quando removido, a coluna volta novamente para a lista
    setColOpt([...colOpt, target.id]);
  };

  const removeAll = () => {
    // reseta lista de filtros aplicados
    setFilterAndDelete([]);
    // reseta a lista de colunas
    setColOpt([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  };

  useEffect(() => {
    let dataFiltered = [...planetsData];
    filterAndDelete.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        dataFiltered = dataFiltered
          .filter((e) => Number(e[filter.column]) > Number(filter.value));
        return;
      }
      if (filter.comparison === 'menor que') {
        dataFiltered = dataFiltered
          .filter((e) => Number(e[filter.column]) < Number(filter.value));
        return;
      }
      if (filter.comparison === 'igual a') {
        dataFiltered = dataFiltered.filter((e) => e[filter.column] === filter.value);
      }
    });
    setNewTest(dataFiltered);
  }, [filterAndDelete, planetsData]);

  useEffect(() => {
    const getStarWarsInfo = () => {
      fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((planets) => {
            delete planets.residents;
          });
          // filtra a pagina de acordo com ordem alfabetica
          data.results.sort((a, b) => a.name.localeCompare(b.name));
          setPlanetsData(data.results);
          setNewTest(data.results);
        });
    };
    getStarWarsInfo();
  }, []);

  return (
    <context.Provider
      value={ { planetsData: test,
        setFilterByName,
        filterByName,
        handleFilters,
        column,
        setColumn,
        comparison,
        setComparison,
        value,
        setValue,
        filterAndDelete,
        setColOpt,
        colOpt,
        compOpt,
        setCompOpt,
        setFilterAndDelete,
        removeFilter,
        removeAll,
        setNewTest,
      } }
    >
      { children }
    </context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
