import { useEffect, useState } from 'react';
import './input.css'
import Navbar from './modules/Navbar'
import PokeList from './modules/PokeList';
import { getPokemonData, getPokemons } from './api/api';

function App() {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const itensPerPage = 30;

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page)
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      console.log('results: ', results)
      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log('fetchPokemons error: ', error)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [page])

  return (
    <div className="flex flex-col">
      <div className='flex justify-center items center w-full bg-gray-900'>
        <h1 className=' text-slate-300 text-sm'>Pokédex by <strong>César Domingos</strong></h1>
      </div>
      <Navbar />
      <PokeList
        pokemons={pokemons}
        loading={loading}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  )
}

export default App