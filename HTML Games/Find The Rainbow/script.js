/* 
 * FIND THE RAINBOW
 * Press (click/tap) the buttons until you find the rainbow!
 * Game is fully responsive via CSS Grid + Flexbox. 
 * 
 * You can play as many times as you'd like, because the rainbow it's always hidden in a different place.
 *
 * Feel free to improve this game, or give me feedback.
 *
 * #006 - #100DaysOfCode
 * By ilithya | 2019
 */
let GAME_OVER = false;
let rainbowBox = null;
const rainbowString = "🌈";
const btnPressClass = "is-pressed";
const rainbowClass = "has-rainbow";

const dialog = {
  hide(dialogBox) {
    dialogBox.style.display = "none";
  },
  updateContent() {
    const boxHeadline = document.querySelector("#play-box .box__headline");
    boxHeadline.textContent = "Play again?";

    const boxText = document.querySelector("#play-box .box__txt");
    boxText.textContent = "Rainbow is never in the same place.";
  },
  showPlayAgain(dialogBox) {
    dialog.updateContent();
    dialogBox.style.display = "block";
  } };


const getRandomIntInclusive = (maxNum, not) => {
  const min = 0;
  const max = Math.floor(maxNum);

  const item = Math.floor(Math.random() * (max - min + 1)) + min;

  // Trick learned with Wes Bos 
  // Avoid getting the same random number from last time
  if (item === not) return getRandomIntInclusive(maxNum, not);

  return item;
};

const rainbow = {
  insert(el) {
    const btnCount = el.length - 1;
    const luckyBtn = getRandomIntInclusive(btnCount, rainbowBox);
    rainbowBox = luckyBtn;

    el[luckyBtn].children[0].textContent = rainbowString;
    el.forEach(item => game.addBtnClick(item));
  },
  remove(el) {
    el.forEach(item => {
      const itemChild = item.children[0];
      itemChild.textContent = "";
      itemChild.classList.remove(rainbowClass);
      item.classList.remove(btnPressClass);
    });
  } };


const game = {
  btn: document.querySelectorAll(".grid__btn"),
  box: document.getElementById("play-box"),
  start() {
    rainbow.insert(game.btn);
    dialog.hide(game.box);
  },
  run() {
    if (GAME_OVER) {
      rainbow.remove(game.btn);
      GAME_OVER = false;
    }
    game.start();
  },
  stop() {
    GAME_OVER = true;

    game.btn.forEach(item => game.removeBtnClick(item));

    setTimeout(() => dialog.showPlayAgain(game.box), 5000);
  },
  play(e) {
    const thisItem = e.target;
    thisItem.classList.add(btnPressClass);
    game.removeBtnClick(thisItem);

    const rainbowEl = thisItem.children[0];
    if (rainbowEl.textContent === rainbowString) {
      rainbowEl.classList.add(rainbowClass);
      game.stop();
    }
  },
  addBtnClick(el) {
    el.addEventListener("click", game.play, false);
  },
  removeBtnClick(el) {
    el.removeEventListener("click", game.play, false);
  } };


const btnPlay = document.getElementById("play-btn");
btnPlay.addEventListener("click", game.run, false);