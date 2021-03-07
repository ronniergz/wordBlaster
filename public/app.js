const row4 = document.querySelector('.row-4');
const time = document.querySelector('#time');
const wordScore = document.querySelector('#words');
const wordList = ['tendency',
  'noiseless',
  'fill',
  'building',
  'death',
  'mist',
  'labored',
  'invincible',
  'donkey',
  'yellow',
  'rural',
  'pricey',
  'tent'
]
let currentWord = '';

// Get random word in array
const getWord = (list) => {
  let index = Math.round(Math.random() * list.length);
  currentWord = list[index];
  return currentWord;
}

// place it in the row
row4.innerHTML = getWord(wordList);


// check for correct keypress

// listen for correct keypress
document.addEventListener('keydown', (e) => {
  let currentLetter = currentWord.charAt(0);
  if (e.key === currentLetter) {     // remove first letter
    currentWord = currentWord.slice(1);
    row4.innerHTML = currentWord;
    if (currentWord === '') {
      row4.innerHTML = getWord(wordList);
    }
  };
});

// 1 minute timer
let seconds = 62;
window.setInterval(() => {
  seconds--;
  let min = Math.round(seconds / 60);
  let sec = seconds - (min * 60);
  time.innerHTML = min + ':' + sec;
  console.log(min + ':' + sec);
}, 1000)




