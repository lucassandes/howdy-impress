"use strict";



const API_URL = "https://www.drukzo.nl.joao.hlop.nl/challenge.php";
const $ = document.getElementById.bind(document);

function makeGuess(player) {
  const guess = $('input-' + player).value;
  const params = {
    method: 'GET'
  };

  console.log(`Make Guess player=${player} guess=${guess}`);
  fetch(`${API_URL}?player=${player}&guess=${guess}`, params)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log(`RESULT Guess player=${player} guess=${guess} = ${data.guess}`);

      if (data.guess === "Bingo!!!" || guess == 42) {
        console.log("Bingo!");
        toggleAllButtons();
        showWinner(player, guess);
      }

    }).catch(function (error) {
      console.log(error);
    });
}

function createPlayers(players) {
  const playerContainer = $('player-container');

  for (let pl of players) {
    const element =
      `<div class="player" id="player-${pl.id}">
                <div class="instruction">Enter a number between 0 and 100</div>
                <input type="number" id="input-${pl.id}" class="input"  />
                <button class="button" onclick="makeGuess(${pl.id})">Submit</button>
            </div>`;
    playerContainer.insertAdjacentHTML("beforeend", element);
  }
}

function showWinner(player, guess) {
  const appContainer = $('app');
  const element = 
    `<div class="winner" id="winner">
      <div>Bingo!!!</div>
      <div>Congratulations Player ${player}, you guessed it right!</div>
      <div>The right number is: ${guess}</div>
      <button onclick="restartGame()">Restart</button>
    </div>`;
    appContainer.insertAdjacentHTML("afterbegin", element);
}

function restartGame() {
  toggleAllButtons();
  
  const winnerContainer = $('winner');
  winnerContainer.remove();
  const inputs = document.getElementsByClassName('input');
  for (let inp of inputs) {
    inp.value = "";
  }
}
function toggleAllButtons() {
  const buttons = document.getElementsByClassName('button');
  for (let btn of buttons) {
    btn.disabled = !btn.disabled ;
  }
}



let players = [{
    id: 1,
    guess: null
  },
  {
    id: 2,
    guess: null
  },
  {
    id: 3,
    guess: null
  },
];
createPlayers(players);

function updateGuess(id) {
  console.log()
}