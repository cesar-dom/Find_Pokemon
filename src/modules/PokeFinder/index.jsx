import React from "react";

const PokeFinder = () => {
  return (
    <div className="bg-red-500 w-full py-4 pr-10 flex flex-col items-center justify-center ">
    <h1>Who's that Pokémon? Game</h1>
        <p>We have selected a random pokémon from a pool of 50. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>
        <div class="form">
        <label for="guessField">Enter a guess: </label>
        <input type="number" min="1" max="100" required id="guessField" class="guessField" className="bg-white py-2 px-6 rounded-full w-96" />
        <input type="submit" value="Submit guess" class="guessSubmit" />
        </div>

        <div id="resultText">
        <p id="guesses">guesses:</p>
        <p id="lastResult">lastResult:</p>
        <p id="lowOrHi">lowOrHi:</p>  {/* pode ser que saia fora */}
        </div>
    </div>
  )
}

export default PokeFinder;