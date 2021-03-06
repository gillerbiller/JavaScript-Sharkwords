
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;
let numRight = 0;
console.log(numRight)


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  for (const char of word){
    $('#word-container').append(`<div class = "letter-box ${char}"></div>`);
  }
};


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const char of ALPHABET){
    $('#letter-buttons').append(`<button>${char}</button>`);
  }
};


// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  $(buttonEl).attr('disabled', true);
};


// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  return $(`div.${letter}`)[0] !== undefined;
};


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  $(`div.${letter}`).html(letter);
};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1

  $(`shark-img img`).attr(`src`, `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    $('button').attr('disabled', true);

    $('#play-again').css('display', '');
  }
};


// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  numWrong = 0;

  $('#shark-img img').attr('src', `/static/images/guess0.png`);

  $('#play-again').css('display', 'none');
  $('#play-again-win').css('display', 'none');

  for (const el of $('#word-container').children()){
    el.remove();
  }

  for (const el of $('#letter-buttons').children()){
    el.remove();
  }
};


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  Array.from(document.querySelctorAll('button'))
    .forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        const clickedBtn = evt.target;
        disableLetterButton(clickedBtn);

        const letter = clickedBtn.innerHTML;

        if(isLetterInWord(letter)) {
          handleCorrectGuess(letter);
        } else{
          handleWrongGuess(letter);
        }
      });
    });

  document.querySelctor('#play-again')
    .addEventListener('click', () =>{
      resetGame();
      startGame();
    }); 
    
})();
