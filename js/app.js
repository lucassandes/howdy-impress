"use strict";

const API_URL = "https://www.drukzo.nl.joao.hlop.nl/challenge.php";
const $ = document.getElementById.bind(document);

function makeGuess(player) {
    const guess = $('input-' + player).value;
    const params = {
        method: 'GET'
    }
    console.log(`Make Guess player=${player} guess=${guess}`);
    fetch(`${API_URL}?player=${player}&guess=${guess}`, params)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log("data", data);
            return (data);
            

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

function disableAllButtons(){
    const buttons = document.getElementsByClassName('button');
    for (let btn of buttons) { 
        btn.disabled = true;
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
disableAllButtons();
function updateGuess(id) {
    console.log()
}