import React, { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "../../api/api";

import RandomPokemonCard from "./components/RandomPokemonCard";

const PokeFinder = () => {
    const [randomNum, setRandomNum] = useState(0)
    console.log('1) randomNum:', randomNum)

    const [randomPokemon, setRandomPokemon] = useState('')
    const [randomPokemonData, setRandomPokemonData] = useState({})
    console.log('2) randomPokemon:', randomPokemon)
    const [guessCount, setGuessCount] = useState(1)
    const [guesses, setGuesses] = useState([]) //TODO: Refactor to be an array
    const [lastResult, setlastResult] = useState('')
    const [startGame, setStartGame] = useState(false)


    const [newGame, setNewGame] = useState(false)

    const fetchRandomPokemon = async () => {
      try {
        const data = await getPokemons(100, 0) //Change the first param to 1154 to search for all Pokémons
        const sortedPokemon = await data.results[randomNum]
        const sortedPokemonData = await getPokemonData(sortedPokemon.url)
        setRandomPokemonData(sortedPokemonData)
        setRandomPokemon(sortedPokemonData.name)
        console.log('randomPokemon ->', randomPokemon)

        return sortedPokemonData;
      } catch (error) {
        console.log('fetchPokemons error: ', error)
      }
    }

    // console.log('sortedPokemonData ->', sortedPokemonData)
      // fetchRandomPokemon()

    useEffect(() => {
      setRandomNum(Math.floor(Math.random() * 100) + 1)
    }, [])
  
    useEffect(() => {
      fetchRandomPokemon()
    }, [randomNum])


    

    const handleSubmit = () => {
      let userGuess = guessField.value;
      console.log('3) guesses antes', guesses)
      setGuesses(userGuess)
      userGuess.toLowerCase()
      console.log('2) userGuess:', typeof userGuess)
      console.log('3) guesses depois', guesses)

      setGuessCount(guessCount + 1)
      // console.log('2) guessCount:', guessCount)
      // GAME MASTER POWER INFO FOR DEBUGGING:
      // console.log('3) userGuess:', userGuess)
      // console.log('4) validation:', userGuess.toLowerCase() === randomPokemon)
      // console.log('userGuess', typeof userGuess)

      if (guessCount === 1) {
        setGuesses(userGuess);
      }
      if (userGuess.toLowerCase() === randomPokemon) {
          setlastResult(`YAY! You guessed CORRECTLY after ${guessCount} ${guessCount === 1 ? 'try' : 'tries'}!`)
          setEndGame()
      } else if (guessCount === 10) {
          setlastResult('G A M E  O V E R!!!');
          setEndGame();
      } else if(userGuess.toLowerCase() !== randomPokemon) {
          setlastResult('W R O N G!');
      }
    }

    const setEndGame = () => {
      setNewGame(true)
    }
    console.log('3) guesses depois', guesses)


    const handleNewGame = () => {
      setlastResult('')
      setGuesses('')
      setNewGame(false)
      setGuessCount(1)
      setRandomNum(Math.floor(Math.random() * 100) + 1) //Change 100 to 1000 if searching for all Pokémons
      fetchRandomPokemon()
    }

    const handleExit = () => {
      setStartGame(false)
    }

  return (
    <div className={startGame ? "bg-red-500 w-full h-full py-4 pr-10 flex flex-col items-center justify-center" : "bg-red-500 w-full py-4 pr-10 flex flex-col items-center justify-center "}>
    <h1>Who's that Pokémon? Game</h1>
        <p>We have selected a <strong>random pokémon</strong> from a pool of 100. See if you can guess it in <strong>10 tries</strong> or fewer.</p>
        
        {!startGame && (
        <button
          className="bg-blue-700 mt-2 ml-12 p-2 rounded-full w-56 hover:bg-blue-900"
          onClick={setStartGame}
        >
          START GAME
        </button>
        )}

        {startGame && (
          <div className="flex flex-col items-center justify-between">
          <RandomPokemonCard pokemon={randomPokemonData} hidden={!newGame} guessCount={guessCount}/>

          <div className="flex flex-col items-center justify-center">
            <p className="text-red-800 font-bold text-3xl">{guesses}</p>
          
            {lastResult && <p className="text-red-800 font-bold text-xs">LAST GUESS</p>}

            <p className="font-bold text-xl">{lastResult}</p>
          
            <div className="mt-4 mb-4">
              <label className="text-white font-bold mr-4 ">Guess the Pokémon Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  min="1"
                  max="100"
                  required
                  id="guessField"
                  placeholder="Pokémon name"
                  className="bg-white py-2 px-6 rounded-full w-96"
                  disabled={newGame ? true : false}

                />
                  {newGame ? (
                    <button
                      className="bg-yellow-600  text-yellow-200 ml-12 p-2 rounded-full w-28 hover:bg-yellow-500  active:bg-yellow-600"
                      onClick={handleNewGame}
                    >
                      RESTART
                    </button>
                      ) : (
                        <button
                          className="bg-lime-400 text-green-900 ml-6 p-2 rounded-full w-28 hover:bg-lime-500 active:bg-lime-600 " 
                          onClick={handleSubmit}
                          disabled={newGame ? true : false}
                        >
                          GUESS
                        </button>
                      )}
                    <button
                        className="text-red-800 ml-2 p-2 rounded-full w-28 active:bg-red-600"
                        onClick={handleExit}
                      >
                        EXIT
                    </button>
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  )
}

export default PokeFinder;