window.addEventListener("load", begin);

let level;
let time;
let tScore = 0;
let score = 0;
let playing;
let width = 0;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const scoreClass = document.querySelector(".scoreClass");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const progress = document.querySelector(".progress");
const selectList = document.querySelector("#selectList");
const selectWord = document.querySelector("#selectWord");
const topScore = document.querySelector(".topScore");

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space"
];

function begin() {
  preBegin();
  getWord(words);
  styleScore(score);
  setInterval(timeCountDown, 1000);
  wordInput.addEventListener("input", checkMatch);
  setInterval(checkGameStatus, 50);
}

function preBegin() {
  if (time === 0 || time === NaN || time === undefined) {
    wordInput.disabled = true;
    timeDisplay.innerHTML = "zero";
  } else {
    wordInput.disabled = false;
  }
}

let difficulty = selectList.addEventListener(
  "change",
  function() {
    let choice =
      selectList.options[selectList.selectedIndex].value;
    if (choice == 1) {
      seconds.innerHTML = 6;
      level = 7;
    } else if (choice == 2) {
      seconds.innerHTML = 4;
      level = 5;
    } else if (choice == 3) {
      seconds.innerHTML = 2;
      level = 3;
    }

    time = level;
    return level;
  }
);

function timeCountDown() {
  // make sure time is not out
  if (time > 0) {
    preBegin();
    time--;
  } else if (time === 0) {
    // game over
    preBegin();
    playing = false;
    handleTopScore();
  }
  // show time to Dom
  timeDisplay.innerHTML = time;
}

function checkMatch() {
  if (wordMatched()) {
    playing = true;
    time = level;
    getWord(words);
    wordInput.value = "";
    score++;
    width += 5;
    progress.style.width = width + "%";
  }
  // if score -1 display zero
  if (score === -1 && width == -1) {
    scoreDisplay.innerHTML = 0;
    progress.style.width = 0;
    message.className = " ";
  } else {
    message.className = " text-success";
    scoreDisplay.innerHTML = score;
    progress.style.width = width + "%";
  }
}

// match current word to word input
function wordMatched() {
  if (wordInput.value === currentWord.innerHTML) {
    message.className += " text-success";
    message.innerHTML = "Correct";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

function getWord(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  currentWord.innerHTML = arr[randomIndex];
}

function checkGameStatus() {
  if (!playing && time === 0) {
    message.className += " text-danger";
    message.innerHTML = "Gamer Over";
    progress.style.width = 0 + "%";
    score = 0;
    width = -1;
    styleScore();
    handleTopScore();
  }
}

function handleTopScore() {
  if (score > tScore) {
    tScore = score;
    topScore.innerHTML = tScore;
    console.log("score");
  }
}

function styleScore() {
  if (score == 0) {
    scoreClass.className = " ";
    scoreClass.className += " bg-danger text-white";
  } else if (score >= 2 && score < 5) {
    scoreClass.className = " ";
    scoreClass.className += " bg-warning text-black";
  } else if (score >= 5 && score < 9) {
    scoreClass.className = " ";
    scoreClass.className += " bg-dark text-white";
  } else if (score > 9) {
    scoreClass.className = " ";
    scoreClass.className += " bg-primary text-white";
  }
}
