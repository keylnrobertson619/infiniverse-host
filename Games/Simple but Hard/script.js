const btnStart = document.getElementById('js-start-btn');
const btnPlayAgain = document.getElementById('js-play-again');
const pnlAttract = document.getElementById('js-attract');
const pnlPlaying = document.getElementById('js-playing');
const pnlFinished = document.getElementById('js-finished');
const displayMeaning = document.getElementById('js-colour-meaning');
const displayColourText = document.getElementById('js-colour-text');
const btnYes = document.getElementById('js-btn-yes');
const btnNo = document.getElementById('js-btn-no');
const displayTimer = document.getElementById('js-timer');
const displayScoreCount = document.getElementById('js-score-count');
const feedbackCorrect = document.getElementById('js-feedback-correct');
const feedbackWrong = document.getElementById('js-feedback-wrong');
const scoreOnFinished = document.getElementById('js-finished-score');
let colourMatchesMeaning = false;
let score = 0;
let feedbackDisplayed = false;
let startTime = null;
let intervalId = null;

const meaning = ['red', 'green', 'blue', 'yellow', 'black'];
const text = ['red', 'green', 'blue', 'yellow', 'black'];
const textColours = [
      {name : 'red', hexCode: '#EB5757'},
      {name : 'green', hexCode: '#27AE60'},
      {name : 'blue', hexCode: '#2D9CDB'},
      {name : 'yellow', hexCode: '#F2C94C'},
      {name : 'black', hexCode: '#000000'}
]

let currentMeaning = '';
let currentText = '';
let currentTextColour = '';

btnStart.addEventListener('click', OnStart);
btnPlayAgain.addEventListener('click', OnStart);

function getRandom() {
      let randomNumber = Math.floor(Math.random() * 5);
      return randomNumber;
}

function OnStart() {
      pnlAttract.style.display = 'none';
      pnlPlaying.style.display = 'flex';
      pnlFinished.style.display = 'none';

      score = 0;
      displayScoreCount.textContent = 0;

      newQuestion();

      startTime = new Date().getTime();
      intervalId = setInterval(onTimerTick, 100);
}

var maxTime = 40;

function onTimerTick() {
  var currentTime = new Date().getTime();
  var elapsedTime = currentTime - startTime;
  var totalSeconds = parseInt(elapsedTime / 1000);
  var remainingTime = maxTime - totalSeconds;
  var minutes = parseInt(remainingTime / 60);
  var seconds = remainingTime % 60;
  var secondsZeroPadded = `0${seconds}`.slice(-2);

  if (remainingTime <= 0) {
    clearInterval(intervalId);

    pnlPlaying.style.display = 'none';
    pnlFinished.style.display = 'flex';
    scoreOnFinished.textContent = score;
  }

  displayTimer.textContent = `${minutes}:${secondsZeroPadded}`;
}

function onAnswerSubmitted(answer) {
      if (feedbackDisplayed === false) { // do something only if feedback is not shown
        
            if (answer === 'yes') {
                  if (colourMatchesMeaning) {
                        score += 1;
                        feedbackCorrect.classList.add('is-active');
                  } else {
                        score -= 2;
                        feedbackWrong.classList.add('is-active');
                  }
            } else {
                  if (colourMatchesMeaning) {
                        score -= 2;
                        feedbackWrong.classList.add('is-active');
                  } else {
                        score += 1;
                        feedbackCorrect.classList.add('is-active');
                  }
            }

            displayScoreCount.textContent = score;
      }

      feedbackDisplayed = true;
      setTimeout(newQuestion, 500);
}

function newQuestion() {

      // remove feedback of previous answer
      feedbackCorrect.classList.remove('is-active');
      feedbackWrong.classList.remove('is-active');
      feedbackDisplayed = false;

      currentMeaning = meaning[getRandom()];
      displayMeaning.textContent = currentMeaning;
      currentText = text[getRandom()];
      displayColourText.textContent = currentText;
      currentTextColour = textColours[getRandom()];
      displayColourText.style.color = currentTextColour.hexCode;

      if (currentMeaning === currentTextColour.name) {
            colourMatchesMeaning = true;
      } else {
            colourMatchesMeaning = false;
      }

      console.log('colour matches meaning: ' + colourMatchesMeaning);

}

      btnYes.addEventListener('click', function() {
            onAnswerSubmitted('yes');
      });

      btnNo.addEventListener('click', function() {
            onAnswerSubmitted('no');
      });