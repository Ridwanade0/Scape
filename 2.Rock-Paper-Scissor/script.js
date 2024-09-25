let scores = [0, 0];

document.querySelectorAll(".control").forEach((control) => {
  document.getElementById(control.id).addEventListener("click", () => {
    let computerGuess = getComputerGuess().toLowerCase();
    let userGuess = document.getElementById(control.id).innerText.toLowerCase();
    document.getElementById("human-guess").innerText = userGuess;
    document.getElementById("computer-guess").innerText = computerGuess;
    let result = getResult(userGuess, computerGuess);
    let resultBoard = document.getElementById("result");
    if (result === "draw") {
      resultBoard.innerText = "It's a draw";
    } else if (result === "win") {
      resultBoard.innerText = "You win";
      scores[0]++;
    } else if (result === "lose") {
      resultBoard.innerText = "You lose";
      scores[1]++;
    }
    document.getElementById("human-score").innerText = scores[0];
    document.getElementById("computer-score").innerText = scores[1];
  });
});
function getResult(userGuess, computerGuess) {
  let result = "";
  if (userGuess === computerGuess) {
    result = "draw";
  } else if (
    (userGuess === "rock" && computerGuess === "scissors") ||
    (userGuess === "paper" && computerGuess === "rock") ||
    (userGuess === "scissors" && computerGuess === "paper")
  ) {
    result = "win";
  } else {
    result = "lose";
  }
  console.log(result);
  return result;
}

function getComputerGuess() {
  let gameOptions = ["rock", "paper", "scissors"];
  let guess = Math.floor(Math.random() * gameOptions.length);
  return gameOptions[guess];
}
