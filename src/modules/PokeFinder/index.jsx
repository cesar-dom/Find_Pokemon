import React, { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "../../api/api";

const PokeFinder = () => {
    const [randomNum, setRandomNum] = useState(0)
    console.log('1) randomNum:', randomNum)

    const [randomPokemon, setRandomPokemon] = useState('')
    console.log('2) randomPokemon:', randomPokemon)
    const [guessCount, setGuessCount] = useState(1)
    const [guesses, setGuesses] = useState('') //TODO: Refactor to be an array
    const [lastResult, setlastResult] = useState('')
    const [lowOrHi, setlowOrHi] = useState('')
    const [newGame, setNewGame] = useState(false)

    const fetchRandomPokemon = async () => {
      try {
        const data = await getPokemons(1154, 0)
        const sortedPokemon = data.results[randomNum]
        const sortedPokemonData = await getPokemonData(sortedPokemon.url)
        setRandomPokemon(sortedPokemonData.name)
        console.log('randomPokemon ->', randomPokemon)
      } catch (error) {
        console.log('fetchPokemons error: ', error)
      }
    }

      // fetchRandomPokemon()

    useEffect(() => {
      setRandomNum(Math.floor(Math.random() * 100) + 1)
    }, [])
  
    useEffect(() => {
      fetchRandomPokemon()
    }, [randomNum])


    

    const handleSubmit = () => {
      let userGuess = guessField.value;
      userGuess.toLowerCase()
      console.log('2) userGuess:', typeof userGuess)

      setGuessCount(guessCount + 1)
      console.log('2) guessCount:', guessCount)
      // GAME MASTER POWER INFO FOR DEBUGGING:
      console.log('3) userGuess:', userGuess)
      console.log('4) validation:', userGuess.toLowerCase() === randomPokemon)
      // console.log('userGuess', typeof userGuess)

      if (guessCount === 1) {
        setGuesses(userGuess);
      }
      if (userGuess.toLowerCase() === randomPokemon) {
          setlastResult('Parabéns! Você acertou!')
          setEndGame()
      } else if (guessCount === 10) {
          setlastResult('!!!FIM DE JOGO!!!');
          setEndGame();
      } else if(userGuess.toLowerCase() !== randomPokemon) {
          setlastResult('Errado!');
          setlowOrHi('Seu palpite está muito frio! (menor)');
          // setlowOrHi('Seu palpite está muito quente! (maior)');
      }
    }

    const setEndGame = () => {
      setlowOrHi('');
      setNewGame(true)
    }

    const handleNewGame = () => {
      setlastResult('')
      setGuesses('')
      setNewGame(false)
      setGuessCount(1)
      setRandomNum(Math.floor(Math.random() * 100) + 1)
      fetchRandomPokemon()
    }

  return (
    <div className="bg-red-500 w-full py-4 pr-10 flex flex-col items-center justify-center ">
    <h1>Who's that Pokémon? Game</h1>
        <p>We have selected a random pokémon from a pool of 50. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>
        <div class="form">
        <label for="guessField">Enter a guess: </label>
        <input
          type="text"
          min="1"
          max="100"
          required
          id="guessField"
          // class="guessField"
          className="bg-white py-2 px-6 rounded-full w-96"
          disabled={newGame ? true : false}

        />
        <button
          className="bg-blue-700 m-12 p-4 rounded-full w-28"
          onClick={handleSubmit}
          disabled={newGame ? true : false}
        >
          Guess
        </button>
        <img className="w-56 h-auto" src="https://cdn.vox-cdn.com/thumbor/ZexHazq-4xlhXhVHvSTPaL3vgbI=/0x0:1920x1080/1820x728/filters:focal(807x387:1113x693):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/53262569/who_pokemon.0.jpg"/>
        </div>

        <div id="resultText">
              <p>Your last Guesses: {guesses}</p>
              <p>{lastResult}</p>
              <p>{lowOrHi}</p> {/* pode ser que saia fora */}
        
        { newGame ? <button className="bg-blue-700 m-12 p-4 rounded-full w-28" onClick={handleNewGame} >Restart</button> : null}
        </div>
    </div>
  )
}

export default PokeFinder;