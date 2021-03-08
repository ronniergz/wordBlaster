import wordList from '/assets/data/words.js';
const word4 = document.querySelector('.word-4');
const rowLeft = document.querySelector('.row-4');
const gameArea = document.querySelector('#game-area');
const beam = document.querySelector('.beam');
const timeDisplay = document.querySelector('#time-display');
const wordScore = document.querySelector('#score');
const pauseButton = document.querySelector('#pauseButton');
const fireButton = document.querySelector('#fireButton');
const endDialog = document.querySelector('.end-dialog');
const finalScore = document.querySelector('#final-score');
let currentWord;
let currentScore = 0;
let time = 360;     // seconds

// Get random word in the word list array
const getWord = (list) => {
  let index = Math.floor(Math.random() * list.length);
  currentWord = list[index];
  setTimeout(() => { word4.classList.add('word-move'); }, 100);
  word4.innerHTML = currentWord;
  return;
}

// add leading zeros to minutes to seconds
const pad = (number, digits) => {
  let string = number.toString();
  if (string.length < digits) string = '0' + string;
  return string;
}

const fire = () => {
  let rect = word4.getBoundingClientRect();   // get current word boundary
  let gameScreen = gameArea.getBoundingClientRect();  // get screen boundary
  let location = window.innerWidth - gameScreen.width;
  let beamCushion = 20;   // add a small space where beam hits word.
  beam.classList.add('beam-fire');
  beam.style.left = (rect.left - (location / 2) - 80 - beamCushion + 'px');
  setTimeout(() => {
    beam.classList.remove('beam-fire');
    beam.style.left = '0%';
  }, 100)
  return;
}

//---------   Initial Setup -----------//
getWord(wordList);
wordScore.innerHTML = currentScore;

//-------------   Timer ---------------//

// add initial time to display
let min = pad(Math.floor(time / 60), 2)
let sec = pad(time - (min * 60), 2)
timeDisplay.innerHTML = min + ':' + sec; console.log(min + ':' + sec);

// start timer
var timer = setInterval(() => {
  time--;
  min = pad(Math.floor(time / 60), 2);
  sec = pad(time - (min * 60), 2);
  if (time === 0) {   // time expired
    timeDisplay.innerHTML = '00:00';
    clearInterval(timer);  // end timer
    finalScore.innerHTML = currentScore;
    endDialog.style.visibility = 'visible';
  }
  timeDisplay.innerHTML = min + ':' + sec;
}, 1000);



//-----------   Key Detect  ------------//
document.addEventListener('keydown', (e) => {
  let currentLetter = currentWord.charAt(0);
  if (e.key === currentLetter) {     // remove first letter
    fire();     // shoot laser at word
    currentWord = currentWord.slice(1);
    word4.innerHTML = currentWord;
    if (currentWord === '') {
      currentScore++;
      wordScore.innerHTML = currentScore;
      word4.classList.remove('word-move');
      getWord(wordList);
      // restart animation
    }
  };
});

//--------   Word Animation End  ---------//
word4.addEventListener('animationend', () => {
  timeDisplay.innerHTML = '00:00';
  clearInterval(timer);  // end timer
  finalScore.innerHTML = currentScore;
  endDialog.style.visibility = 'visible';
});


//~~~~~~~~~~~~  Testing  ~~~~~~~~~~~~~~//
// toggle animation 
pauseButton.addEventListener('click', (e) => {
  if (word4.style.animationPlayState === 'paused') {
    word4.style.animationPlayState = 'running'
  } else word4.style.animationPlayState = 'paused';
});

fireButton.addEventListener('click', (e) => {
  console.log('Fire!');
});

