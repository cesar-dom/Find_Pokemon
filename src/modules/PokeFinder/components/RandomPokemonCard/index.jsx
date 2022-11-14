import React from "react";

const RandomPokemonCard = ({ pokemon, hidden, guessCount }) => {
  return (
    <div className="w-72 h-60 my-4 p-4 bg-slate-50 rounded-lg flex flex-col items-center justify-between none">
      <div className="w-full flex justify-between">
        {!hidden && (
            <>
        <span className="text-indigo-500 text-lg font-bold capitalize">{pokemon.name}</span>
        <p className="text-gray-500">#{pokemon.id}</p>
        </>
        )}
      </div>
      {guessCount >= 4 && (
        <div className="flex mb-2 w-full h-4">
            <span className="text-white bg-indigo-600 text-xs font-regular text-opacity-70 py-0 px-2 rounded-xl mr-1">TYPE</span>
            <div className="w-full flex gap-2 items-center"> 
                {pokemon.types.map((type, index) => {
                return (
                    <div key={index}>
                    <span className="text-gray-500 text-sm font-bold capitalize">{type.type.name}</span>
                    </div>
                )
                })}
            </div>
        </div>
      )}
      <div className="flex justify-center items-center w-full relative ">
        {pokemon ? <img src={pokemon.sprites.front_default || ""} alt={pokemon.name} className="w-44 h-44 z-10 mix-blend-multiply" /> : null }
        {hidden && (
        <>
            <div className={guessCount >= 7 ? "absolute w-full h-full bg-black opacity-60 rounded-xl" : "absolute w-full h-full bg-black opacity-90 rounded-xl"}></div>
            <div className="absolute w-full h-full flex items-center justify-center">
                <span className="text-white font-black text-4xl z-10">?</span>
            </div>
        </>
        )}
      </div>
    </div>
  )

}
export default RandomPokemonCard;