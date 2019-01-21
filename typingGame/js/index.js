window.addEventListener("load", begin);

//change level
let level;
let time;
let score = 0;
let playing;
let width = 0;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const progress = document.querySelector(".progress");
const selectList = document.querySelector("#selectList");

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
  "space",
  "definition"
];

function begin() {
  // show number of seconds
  getWord(words);
  // call countdown every second
  setInterval(timeCountDown, 1000);
  //start matching word input
  wordInput.addEventListener("input", checkMatch);
  //check game status
  setInterval(checkGameStatus, 50);
}

let difficulty = selectList.addEventListener("change", function() {
  let choice = selectList.options[selectList.selectedIndex].value;
  if (choice == 1) {
    console.log("one");
    seconds.innerHTML = 6;
    level = 7;
  } else if (choice == 2) {
    console.log("two");
    seconds.innerHTML = 4;
    level = 5;
  } else if (choice == 3) {
    console.log("three");
    seconds.innerHTML = 2;
    level = 3;
  }
  console.log(level);
  time = level;
  return level;
});

function timeCountDown() {
  // make sure time is not out
  if (time > 0) {
    time--;
  } else if (time === 0) {
    // game over
    playing = false;
  }
  // show time to Dom
  timeDisplay.innerHTML = time;
}

function checkMatch() {
  if (wordMatched()) {
    playing = true;
    time = level + 1;
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
    score = -1;
    width = -1;
  }
}
