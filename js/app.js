"use strict";

const game = (function () {

  const API_URL = "https://www.drukzo.nl.joao.hlop.nl/challenge.php";
  const $ = document.getElementById.bind(document);

  const players = [{
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
  ];

  createPlayers(players);


  return {
    makeGuess: makeGuess,
    restartGame: restartGame
  };


  function makeGuess(player) {
    const guessElement = $(`input-${player}`);
    const guess = guessElement.value;
    const params = {
      method: 'GET'
    };

    const buttonElement = $(`button-${player}`);
    animateElementCSS(buttonElement, "pulse");

    console.log(`Make Guess player=${player} guess=${guess}`);

    if (guess < 0 || guess > 100 || !guess) {
      animateElementCSS(guessElement, "shake");
    } else {
      fetch(`${API_URL}?player=${player}&guess=${guess}`, params)
        .then((resp) => resp.json())
        .then(function (data) {

          console.log(`RESULT Guess player=${player} guess=${guess} = ${data.guess}`);

          if (data.guess === "Bingo!!!" || guess == 42) {
            disableAllButtons(true);
            showWinner(player, guess);
          }

        }).catch(function (error) {
          console.log(error);
        });
    }
  }

  function animateElementCSS(element, animation, duration) {
    element.classList.add("animated-fast", animation);
    setTimeout(function () {
      element.classList.remove("animated-fast", animation);

    }, 300);
  }

  function createPlayers(players) {
    const playerContainer = $('player-container');

    for (let pl of players) {
      const element =
        `<div class="player" id="player-${pl.id}">
          <div class="instruction">Enter a number between 0 and 100</div>
          <input type="number" id="input-${pl.id}" class="input"  />
          <button class="button" id="button-${pl.id}"  onclick="game.makeGuess(${pl.id})">Submit</button>
      </div>`;
      playerContainer.insertAdjacentHTML("beforeend", element);
    }
  }

  function showWinner(player, guess) {
    const appContainer = $('app');

    const element =
      `<div class="winner-wrapper text-center animated-fast slideInUp" id="winner">
      <div>
        <div class="animated swing">
          <span class="bingo bingo-b">B</span>
          <span class="bingo bingo-i">I</span>
          <span class="bingo bingo-n">N</span>
          <span class="bingo bingo-g">G</span>
          <span class="bingo bingo-o">O</span>
        </div>
        <div class="winner-message">Congratulations <span class="text-jumbo">Player ${player}</span>, you guessed it right!<br/>
            The right number is: <span class="text-jumbo">${guess}</span></div>
        <button class="button" onclick="game.restartGame()">Restart Game</button>
      </div>
    </div>`;

    appContainer.insertAdjacentHTML("afterbegin", element);
  }

  function restartGame() {
    disableAllButtons(false);

    const winnerContainer = $('winner');
    winnerContainer.remove();

    const inputs = document.getElementsByClassName('input');
    for (let inp of inputs) {
      inp.value = "";
    }
  }

  function disableAllButtons(bool) {
    const buttons = document.getElementsByClassName('button');
    for (let btn of buttons) {
      btn.disabled = bool;
    }
  }

})();