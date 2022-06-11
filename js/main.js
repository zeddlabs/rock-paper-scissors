const RENDER_SCORE = "render-score";

const rulesBtn = document.querySelector(".rules-btn");
const rulesModal = document.querySelector(".rules-modal");
const closeBtn = document.querySelector(".close-btn");

const buttons = document.querySelectorAll(".step-1 div");
const step1 = document.querySelector(".step-1");
const step2 = document.querySelector(".step-2");
const winnerInfo = document.querySelector(".win-title");
const playerPicked = document.querySelector(".you-picked").lastElementChild;
const housePicked = document.querySelector(".house-picked").lastElementChild;
const playerScore = document.querySelector(".your-score");
const resetBtn = document.querySelector(".reset-btn");
const playAgain = document.querySelector(".play-again");

if (localStorage.getItem("score") === null) {
  localStorage.setItem("score", "0");
}

let score = Number(localStorage.getItem("score"));
playerScore.innerText = score;

document.addEventListener(RENDER_SCORE, () => {
  playerScore.innerText = localStorage.getItem("score");
});

rulesBtn.addEventListener("click", () => {
  rulesModal.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rulesModal.classList.remove("show");
});

const arrChoose = ["rock", "paper", "scissors", "lizard", "spock"];
const getHousePicked = () => {
  const index = Math.floor(Math.random() * arrChoose.length);
  return arrChoose[index];
};

const getResult = (house, player) => {
  if (player == house) return "Draw";
  if (player == "rock")
    return house == "scissors" || house == "lizard" ? "You Win" : "You Lose";
  if (player == "paper")
    return house == "rock" || house == "spock" ? "You Win" : "You Lose";
  if (player == "scissors")
    return house == "paper" || house == "lizard" ? "You Win" : "You Lose";
  if (player == "lizard")
    return house == "paper" || house == "spock" ? "You Win" : "You Lose";
  if (player == "spock")
    return house == "scissors" || house == "rock" ? "You Win" : "You Lose";
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    step1.classList.add("hidden");

    const player = btn.getAttribute("data-name");
    const house = getHousePicked();

    playerPicked.setAttribute("class", `big ${player}`);
    playerPicked
      .querySelector("img")
      .setAttribute("src", `images/icon-${player}.svg`);

    housePicked.setAttribute("class", `big ${house}`);
    housePicked
      .querySelector("img")
      .setAttribute("src", `images/icon-${house}.svg`);

    winnerInfo.innerText = getResult(house, player);
    if (getResult(house, player) == "You Win") {
      score++;
      housePicked.classList.remove("win");
      playerPicked.classList.add("win");
    } else if (getResult(house, player) == "You Lose") {
      playerPicked.classList.remove("win");
      housePicked.classList.add("win");
    } else {
      playerPicked.classList.remove("win");
      housePicked.classList.remove("win");
    }

    localStorage.setItem("score", `${score}`);
    document.dispatchEvent(new Event(RENDER_SCORE));

    step2.classList.remove("hidden");
  });
});

playAgain.addEventListener("click", () => {
  step1.classList.remove("hidden");
  step2.classList.add("hidden");
});

resetBtn.addEventListener("click", () => {
  localStorage.setItem("score", "0");
  step1.classList.remove("hidden");
  step2.classList.add("hidden");
  document.dispatchEvent(new Event(RENDER_SCORE));
});
