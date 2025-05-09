let points = parseInt(localStorage.getItem("points")) || 100;
const correctVIP = "VIPFREE";

function updatePointsDisplays() {
  document.getElementById("pointsDonate").textContent = points;
  document.getElementById("pointsVIP").textContent = points;
}

function donatePoints() {
  const amount = parseInt(document.getElementById("donateAmount").value);
  if (amount > 0 && amount <= points) {
    points -= amount;
    localStorage.setItem("points", points);
    updatePointsDisplays();
    alert(`🎁 You donated ${amount} points!`);
  } else {
    alert("❌ Not enough points.");
  }
}

function redeemCode() {
  const code = document.getElementById("vipCode").value;
  if (code === correctVIP) {
    points += 1000;
    localStorage.setItem("points", points);
    updatePointsDisplays();
    alert("✅ VIP Code Redeemed! +1000 Points");
  } else {
    alert("❌ Invalid Code");
  }
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";
  goBack();
}
let gameUrls = {
    'snake': 'https://play.snake-game.io/',
    'flappy': 'https://flappybird.io/',
    'runner': 'https://games.cdn.famobi.com/html5games/p/pixel-runner/v200/?fg_domain=play.famobi.com',
    'brick': 'https://games.cdn.famobi.com/html5games/b/brick-breaker/v040/?fg_domain=play.famobi.com',
    '2048': 'https://play2048.co/',
    'tic': 'https://playtictactoe.org/',
    'mines': 'https://minesweeper.online/',
    'space': 'https://playclassic.games/games/shoot-em-up/galaga/',
    'frog': 'https://froggerclassic.appspot.com/',
    'racing': 'https://html5.gamedistribution.com/rvvASMiB/36/',
    'pong': 'https://ponggame.org/'
};
const gameList = document.getElementById("gameList");
for (let [key, value] of Object.entries(gameUrls)) {
  const card = document.createElement("div");
  card.className = "gameCard";
  card.textContent = key;
  card.onclick = () => {loadGame(key)};
  gameList.appendChild(card);
};
function loadGame(game) {
    if (gameUrls[game]) {
        document.getElementById("gameList").style.display = "none";
        document.getElementById("back-btn").style.display = "block";
        document.getElementById("gameFrame").src = gameUrls[game];
        document.getElementById("gameFrame").style.display = "block";
    }
}
function goBack() {
    document.getElementById("gameList").style.display = "flex";
    document.getElementById("back-btn").style.display = "none";
    document.getElementById("gameFrame").src = '';
    document.getElementById("gameFrame").style.display = "none";
}
updatePointsDisplays();
