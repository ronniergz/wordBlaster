import wordList from '/assets/data/words.js';
const gameArea = document.querySelector('#game-area');
const shipWrapper = document.querySelector('#ship-wrapper');
const beam = document.querySelector('.beam');
const timeDisplay = document.querySelector('#time-display');
const wordScore = document.querySelector('#score');
const pauseButton = document.querySelector('#pauseButton');
const endDialog = document.querySelector('.end-dialog');
const finalScore = document.querySelector('#final-score');
let activeRows = [];
let currentWord = '';
let currentRow;  // element
let currentRowNum;  // number
let currentScore = 0;
let time = 360;     // seconds
let nextWordCounter = 0;
let isPaused = false;

// Get random word in the word list array
const getWord = (list) => {
  let index = Math.floor(Math.random() * list.length);
  let newWord = list[index];

  let duplicate = false;
  let randomRowNum = Math.ceil(Math.random() * 5); // random number
  // check if row number is already in the active rows array
  do {
    let matches = activeRows.filter((num) => num === randomRowNum)
    if (matches.length > 0) {  // there's a duplicate!
      duplicate = true;
      randomRowNum = Math.ceil(Math.random() * 5); // random number
    } else duplicate = false;
  } while (duplicate === true);
  // add new row number to array
  activeRows.push(randomRowNum);

  // update current word and row
  currentRowNum = activeRows[0];
  currentRow = document.querySelector('.word-' + currentRowNum);
  let randomRow = document.querySelector('.word-' + randomRowNum);
  randomRow.innerHTML = newWord;
  if (activeRows.length === 1) currentWord = newWord;

  // move ship to correct location, rows in 80px increments
  //moveShip(currentRowNum);
  // start word move animation
  setTimeout(() => { randomRow.classList.add('word-move'); }, 100);

  return;
}

// add leading zeros to minutes to seconds
const pad = (number, digits) => {
  let string = number.toString();
  if (string.length < digits) string = '0' + string;
  return string;
}

const moveShip = (rowNum) => {
  let shipY = 80 * rowNum - 80 + 'px';
  shipWrapper.style.transform = 'translateY(' + shipY + ')';
}
// shoot beam at the current word
const fire = () => {
  let rect = currentRow.getBoundingClientRect();   // get current word boundary
  let gameScreen = gameArea.getBoundingClientRect();  // get screen boundary
  let location = window.innerWidth - gameScreen.width;
  let beamCushion = 50;   // add a small space where beam hits word.
  beam.classList.add('beam-fire');
  beam.style.left = (rect.left - (location / 2) - 80 - beamCushion + 'px');
  setTimeout(() => {
    beam.classList.remove('beam-fire');
    beam.style.left = '80px';
  }, 100)
  return;
}

//---------   Initial Setup -----------//
getWord(wordList);
wordScore.innerHTML = currentScore;

//---------  Game Timer  --------------//
// add initial time to display
let min = pad(Math.floor(time / 60), 2)
let sec = pad(time - (min * 60), 2)
timeDisplay.innerHTML = min + ':' + sec;
// start timer
var timer = setInterval(() => {
  if (isPaused === false) {
    time--;
    nextWordCounter++;
  }
  min = pad(Math.floor(time / 60), 2);
  sec = pad(time - (min * 60), 2);
  // add the next word every 3s
  if (nextWordCounter === 2) {   /*---------------------------------*/
    if (activeRows.length < 5) getWord(wordList);
    nextWordCounter = 0;
  }
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
    currentRow.innerHTML = currentWord;
    if (currentWord === '') {
      currentScore++;
      wordScore.innerHTML = currentScore;
      currentRow.classList.remove('word-move');
      activeRows = activeRows.slice(1);
      // move current word to next word
      currentRow = document.querySelector('.word-' + activeRows[0]);
      currentWord = currentRow.innerHTML;
      //moveShip(currentRowNum);
    }
  };
});

//--------   Word Animation End  ---------//
document.addEventListener('animationend', () => {
  timeDisplay.innerHTML = '00:00';
  clearInterval(timer);  // end timer
  finalScore.innerHTML = currentScore;
  endDialog.style.visibility = 'visible';
});

//-------------   Pause Game  -------------//
// toggle animation 
pauseButton.addEventListener('click', (e) => {
  const togglePause = (state) => {
    let animation;
    if (state === true) animation = 'paused';
    else animation = 'running'
    for (let i = 1; i <= 5; i++) {
      let word = document.querySelector('.word-' + i);
      word.style.animationPlayState = animation;
    }
    isPaused = state;
  }
  if (isPaused === false) togglePause(true);
  else togglePause(false)
});


