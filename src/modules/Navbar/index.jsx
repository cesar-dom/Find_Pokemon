import React, { useState } from "react";
import { searchPokemon } from "../../api/api";

const Navbar = () => {
  const [search, setSearch] = useState()
  const [pokemon, setPokemon] = useState()

  const onChangeHandler = (e) => {
    console.log('pokemon: ', e.target.value)
    setSearch(e.target.value)
  }

  const onButtonClickHandler = () => {
    onSearchHandler(search)
  }

  const onSearchHandler = async (pokemon) => {
    const result = await searchPokemon(pokemon)
    setPokemon(result)
    console.log('pokemon: ', result)
  }

  return (
    <>
      <div className="w-full h-16 flex justify-start items-center bg-indigo-500">
        <div className="flex m-6">
          <a href="/" target="_blank">
            <img src="pokedexlogo.png" alt="Vite logo" className="w-10 h-auto" />
          </a>
        </div>
        <div className="flex items-center  m-6">
          <div>
            <input onChange={onChangeHandler} type="text" placeholder="Search Pokémon" className="bg-white py-2 px-6 rounded-full w-96" />
          </div>
          <div>
            <button onClick={onButtonClickHandler} className="text-2xl p-4 rounded-full text-white hover:text-indigo-800"><i className="uil uil-search" /></button>
          </div>
        </div>
      </div>
    </>
  )

}
export default Navbar;