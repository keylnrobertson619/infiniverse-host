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
let games = ["Catch The Eggs", "Find The Rainbow", "Get Coins and Don't Die", "Guess The Number", "Memory", "Pong", "Puzzle", "Rock Paper Scissors", "Rolling for 20", "Simple but Hard", "Tic-Tac-Toe"];
const gameList = document.getElementById("gameList");
games.forEach(game => {
  const card = document.createElement("div");
  card.className = "gameCard";
  card.textContent = game;
  card.onclick = () => {loadGame("./Games/" + game + "/index.html")};
  gameList.appendChild(card);
});
function loadGame(link) {
  console.log(link)
  document.querySelectorAll('.gameCard').forEach(card => {
    card.style.fontSize = '12px';
  });
  document.getElementById("gameList").style.width = "120px";
  document.getElementById("back-btn").style.display = "absolute";
  document.getElementById("gameFrame").src = link;
  document.getElementById("gameFrame").style.display = "block";
}
function goBack() {
  document.querySelectorAll('.gameCard').forEach(card => {
    card.style.fontSize = '16px';
  });
  document.getElementById("gameList").style.width = "100%";
  document.getElementById("back-btn").style.display = "none";
  document.getElementById("gameFrame").src = '';
  document.getElementById("gameFrame").style.display = "none";
}
updatePointsDisplays();
