"use strict";

const game = (function () {
  const API_URL = "https://www.drukzo.nl.joao.hlop.nl/challenge.php";
  const $ = document.getElementById.bind(document); 
  const players = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];
  
  return {
    makeGuess: makeGuess,
    restartGame: restartGame,
    startGame: startGame,
  };


  function startGame(){
    createPlayers(players);
  }

  function makeGuess(player) {
    const guessElement = $(`input-${player}`);
    const bingo = "Bingo!!!";
    const guess = guessElement.value;
    const buttonElement = $(`button-${player}`);
    const params = {
      method: 'GET'
    };

    console.log(`[PLAYER ${player}] made a guess. GUESS = ${guess}`);
    if (guess < 0 || guess > 100 || !guess) {
      animateElementCSS(buttonElement, "pulse");
      animateElementCSS(guessElement, "shake");
      console.log(`[RESPONSE to PLAYER ${player}]: Player ${player} - guess=${guess} => Response: not between 0 and 100`);
    } else {

      buttonElement.disabled = true;
      buttonElement.classList.add("animated", "infinite", "pulse");

      fetch(`${API_URL}?player=${player}&guess=${guess}`, params)
        .then((resp) => resp.json())
        .then(function (data) {
          console.log(`[RESPONSE to PLAYER ${player}]: guess=${guess} => Response: ${data.guess}`);
          if (data.guess === bingo || guess == 42) {
            endGame(player, guess);
          }
          else {
            showTip(player, data.guess);
            buttonElement.disabled = false;
          }

        }).catch(function (error) {
          console.log(error);
        }).then(() => {
          buttonElement.classList.remove("animated");
        });
    }
  }

  function showTip(player, guessResult) {
    const higher = "higher";
    const lower = "lower";
    const tipElement = $(`tip-${player}`);
    const higherAnimations = ["tip-higher", "fadeOutUp"];
    const lowerAnimations = ["tip-lower", "fadeOutDown"];
    
    tipElement.classList.remove('display-none');

    switch (guessResult){
      case higher: 
        tipElement.classList.remove(...lowerAnimations);
        tipElement.classList.add(...higherAnimations);
        tipElement.innerHTML = `${higher} ⬆`;
        break;
      case lower: 
        tipElement.classList.remove(...higherAnimations);
        tipElement.classList.add(...lowerAnimations);
        tipElement.innerHTML = `${lower} ⬇`;
        break;
    }

    setTimeout(function () {
      tipElement.classList.add('display-none');
    }, 1000);
    
  }

  function animateElementCSS(element, animation, duration) {
    element.classList.add("animated-fast", animation);
    setTimeout(function () {
      element.classList.remove("animated-fast", animation);
    }, 300);
  }

  function endGame(player, guess) {
    const hasWinner = Boolean($('winner'));
    if(!hasWinner) {
      disableAllButtons(true);
      showWinner(player, guess);
    }
  }

  function createPlayers(players) {
    const playerContainer = $('player-container');

    for (let pl of players) {
      const element =
        `<div class="player" id="player-${pl.id}">
          <div class="instruction">Enter a number between 0 and 100</div>
          <div class="display-none animated tip text-center" id="tip-${pl.id}"></div>
          <input type="number" id="input-${pl.id}" class="input"  />
          <button class="button" id="button-${pl.id}"  onclick="game.makeGuess(${pl.id})">Submit</button>
      </div>`;
      playerContainer.insertAdjacentHTML("beforeend", element);
    }
  }

  function showWinner(player, guess) {
    const appContainer = $('app');
    const element =
      `<div class="winner-wrapper text-center flex-center-center animated-fast slideInUp" id="winner">
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
    const winnerContainer = $('winner');
    const inputs = document.getElementsByClassName('input');
    
    disableAllButtons(false);
    winnerContainer.remove();
    
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

game.startGame();