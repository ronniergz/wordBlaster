import wordList from '/assets/data/words.js';
const word4 = document.querySelector('.word-4');
const timeDisplay = document.querySelector('#time-display');
const endDialog = document.querySelector('.end-dialog');
const wordScore = document.querySelector('#score');
const testButton = document.querySelector('#testButton');
let currentWord;
let currentScore = 0;
let time = 360;

// Get random word in array
const getWord = (list) => {
  let index = Math.floor(Math.random() * list.length);
  currentWord = list[index];
  word4.classList.add('word-start');
  word4.innerHTML = currentWord;
  return;
}
// start moving word to move left
// word4.classList.add('word-move');

getWord(wordList);


//-------------   Timer ---------------//
// add leading zeros if necessary
const pad = (number, digits) => {
  let string = number.toString();
  if (string.length < digits) string = '0' + string;
  return string;
}

// add initial time to display
let min = pad(Math.floor(time / 60), 2)
let sec = pad(time - (min * 60), 2)
timeDisplay.innerHTML = min + ':' + sec; console.log(min + ':' + sec);

// start timer
var timer = setInterval(() => {
  time--;
  min = pad(Math.floor(time / 60), 2);
  sec = pad(time - (min * 60), 2);
  // *************** word hit ship
  // *************** pause
  if (time === 0) {   // time expired
    timeDisplay.innerHTML = '00:00';
    clearInterval(timer);  // end timer
    endDialog.style.visibility = 'visible';
  }
  timeDisplay.innerHTML = min + ':' + sec;
}, 1000);

//-----------   Key Detect  ------------//
document.addEventListener('keydown', (e) => {
  let currentLetter = currentWord.charAt(0);
  if (e.key === currentLetter) {     // remove first letter
    currentWord = currentWord.slice(1);
    word4.innerHTML = currentWord;
    if (currentWord === '') {
      currentScore++;
      wordScore.innerHTML = currentScore;
      getWord(wordList);
      // restart animation
      //word4.classList.remove('word-move');
    }
  };
});


//~~~~~~~~~~~~  Testing  ~~~~~~~~~~~~~~//
document.addEventListener('click', (e) => {
  word4.classList.add('word-move');
});