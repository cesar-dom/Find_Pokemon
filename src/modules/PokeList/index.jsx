import React, { useState } from "react";
import PaginationControls from "./components/PaginationControls";
import PokemonCard from "./components/PokemonCard";
import PokeFinder from "../PokeFinder";


const PokeList = (props) => {
  const { pokemons, loading, page, totalPages, setPage } = props;

  const onBackClickHandler = () => {
    page > 0 && setPage(page - 1)
  }

  const onNextClickHandler = () => {
    page + 1 !== totalPages && setPage(page + 1)
  }

  return (

    <>
      {loading ? (
        <div className="p-20 flex justify-center items-center">
          <h1 className="text-indigo-500 font-bold">Carregando...</h1>
        </div>
      ) : (
        <div>
        <PokeFinder />
          
          <div className="w-full py-4 pr-10 flex justify-end">
            <PaginationControls
              page={page + 1}
              totalPages={totalPages}
              onBackClick={onBackClickHandler}
              onNextClick={onNextClickHandler}
            />
          </div>
          <div className="gap-10 px-10 grid grid-cols-3">
            {pokemons && pokemons.map((pokemon, index) => {
              return (
                <PokemonCard key={index} pokemon={pokemon} />
              )
            })}

          </div>
        </div>
      )}
    </>
  )

}
export default PokeList;