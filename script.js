"use strict";

const player1El = document.querySelector(".player--1");
const player2El = document.querySelector(".player--2");
const score1El = document.querySelector("#score--1");
const score2El = document.getElementById("score--2");
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function(){
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function(){
  if(playing){
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    if(dice !== 1){
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function(){
  if(playing){
    scores[activePlayer-1] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer-1];

    if(scores[activePlayer-1] >= 100){
      playing = false;
      diceEl.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    }else{
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);