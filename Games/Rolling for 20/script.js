var scores, roundScore, activePlayer, cube, currentClass;

init();
  
function changeSide() {
  var dice = (Math.floor(Math.random()*6)+1);
  var showClass = 'show-' + dice;
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  cube.classList.add(showClass);
  currentClass = showClass;
  function updateScore() {
  document.querySelector('.player-controls').classList.remove('disable-controls');
  document.querySelector('.fa-dice').classList.remove('grey');
  document.querySelector('.fa-hand-holding').classList.remove('grey');
    if (dice !==1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
  setTimeout(updateScore, 2000);
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  cube.classList.remove('animation-1');
  var counter = 0;
  var loopCount = 30;
  function spinCube() {
    if (++counter >= loopCount) {
        clearInterval(interval);
        cube.classList.remove('animation-2');
    } else {
        cube.classList.add('animation-2'); 
        document.querySelector('.player-controls').classList.add('disable-controls');
        document.querySelector('.fa-dice').classList.add('grey');
        document.querySelector('.fa-hand-holding').classList.add('grey');
    }
  }
  var interval = setInterval(spinCube, 60);
  changeSide();
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += roundScore;   
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.dice').classList.add('displaynone');
    document.querySelector('.player-controls').classList.add('displaynone');
  } else {
    nextPlayer();
  }  
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-controls').classList.toggle('player-controls-right');
  document.querySelector('.fa-dice').classList.toggle('fa-flip-horizontal');
  document.querySelector('.fa-hand-holding').classList.toggle('fa-flip-horizontal');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  cube = document.querySelector('.cube');
  currentClass = '';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player1';
  document.getElementById('name-1').textContent = 'Player2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-controls').classList.remove('player-controls-right');
  document.querySelector('.fa-dice').classList.remove('fa-flip-horizontal');
  document.querySelector('.fa-hand-holding').classList.remove('fa-flip-horizontal');
  document.querySelector('.dice').classList.remove('displaynone');
  document.querySelector('.player-controls').classList.remove('displaynone');
  cube.classList.add('animation-1'); 
}

document.querySelector('.btn-rules').addEventListener('click', function() {
  document.querySelector('.popuptext').classList.remove('hiderules');
  document.querySelector('.popuptext').classList.add('showrules');
});
    
document.querySelector('.btn-close').addEventListener('click', function() {
  document.querySelector('.popuptext').classList.remove('showrules');    
  document.querySelector('.popuptext').classList.add('hiderules');  
});