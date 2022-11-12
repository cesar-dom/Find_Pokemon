import React, { useState } from "react";

const PokemonCard = ({ pokemon }) => {
  // const { pokemon } = props;
  return (
    <div className="m-4 p-4 bg-slate-50 rounded-lg flex flex-col items-center">
      <div className="w-full flex justify-between">
        <span className="text-indigo-500 text-lg font-bold capitalize">{pokemon.name}</span>
        <p className="text-gray-500">#{pokemon.id}</p>
      </div>
      <div className="w-full flex gap-2">
        {pokemon.types.map((type, index) => {
          return (
            <div key={index}>
              <span className="text-gray-500 text-xs font-bold capitalize">{type.type.name}</span>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center w-full">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-36 h-auto" />
      </div>
    </div>
  )

}
export default PokemonCard;