import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import pokemonTypes from '../../api/pokemonTypes';

export const Card = ({ pokemon, selectPokemon }) => (
  <div className="card">
    <div className="card__card"
      onClick={() => {
        selectPokemon(pokemon.id);
      }}>
      <div className="card__name">
        {pokemon.name}
      </div>
      <div className="card__image-container">
        <img
          className="card__image"
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
        />
      </div>
      <div className="card__types">
        {pokemon.types.map(type => (
          <div
            className="card__type"
            key={type.slot}
            style={{ backgroundColor: pokemonTypes[type.type.name] }}
          >
            {type.type.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);