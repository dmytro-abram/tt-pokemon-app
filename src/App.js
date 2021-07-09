import React, { useEffect, useState, useCallback } from 'react';
import './App.scss';
import { Card } from './components/Card/Card';
import { InfoCard } from './components/InfoCard/InfoCard'
import { getAllPokemon, getPokemon } from './api/api';
import { Loader } from './components/Loader/Loader';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [limit, setLimit] = useState(12);
  const [nextPageUrl, setNextPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);

  const downloadData = useCallback( async (loadLink) => {
    setLoading(true);
    const response = await getAllPokemon(loadLink);
    await loadPokemon(response.results);
    setLoading(false);
  }, [limit]);

  useEffect(async () => {
    await downloadData(nextPageUrl);
  }, []);

  const loadPokemon = async (data) => {
    const pokemon = await Promise.all(
      data.map(async pokemon => {
        return getPokemon(pokemon.url);
      }));

    setPokemonData((prevData) => ([
      ...prevData,
      ...pokemon,
    ]));
  };

  const handlePokemonSelection = (pokemonId) => {
    setPokemon(pokemonData.filter(pokemon => pokemon.id === pokemonId));
  };

  const filterPokemonByType = pokemonData.filter(p => p.types.some(slot => slot.type.name.toLowerCase().includes(query.toLowerCase())));

  return (
    <>
      <div className="header">
        <div className="header__title">
          Pokedex
        </div>
      </div>
      {loading
        ? (
          <div className="loader">
            <Loader />
          </div>
        )
        : (
          <div className="main">
            <input
              type="text"
              id="search-query"
              className="input"
              placeholder="Find pokemon by type"
              value={query}
              onChange={event => {
                setQuery(event.target.value);
              }}
            />
            <div className="main__container">
              {filterPokemonByType.map(pokemon => (
                <Card
                  key={pokemon.id}
                  pokemon={pokemon}
                  selectPokemon={handlePokemonSelection}
                />
              ))}
            </div>
            <div className="main__button-container">
              <button
                type="button"
                className="button"
                onClick={(event) => {
                  event.preventDefault();
                  downloadData(nextPageUrl);
                }}
              >
                Load more
              </button>
            </div>
            <div className="cards">
              {pokemon.map(pokemon => (
                <InfoCard
                  pokemon={pokemon}
                  key={pokemon.id}
                />
              ))}
            </div>
          </div>
        )}
    </>
  );
}

export default App;