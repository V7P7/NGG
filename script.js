document.addEventListener("DOMContentLoaded", function () {
  let secretNumber;
  let attempts = 0;
  let chances, hints, difficulty;

  // Attach event listeners
  document.getElementById("restartButton").style.display = "none";

  document.getElementById("easyButton").addEventListener("click", function () {
    setDifficulty("easy");
  });

  document
    .getElementById("mediumButton")
    .addEventListener("click", function () {
      setDifficulty("medium");
    });

  document.getElementById("hardButton").addEventListener("click", function () {
    setDifficulty("hard");
  });

  document
    .getElementById("confirmButton")
    .addEventListener("click", confirmDifficulty);

  document
    .getElementById("submitGuessButton")
    .addEventListener("click", checkGuess);

  document.getElementById("hintButton").addEventListener("click", giveHint);

  document
    .getElementById("restartButton")
    .addEventListener("click", restartGame);

  function setDifficulty(difficultyLevel) {
    difficulty = difficultyLevel;
    document.getElementById("confirmButton").style.display = "block";

    switch (difficultyLevel) {
      case "easy":
        document.body.className = "easy";
        break;
      case "medium":
        document.body.className = "medium";
        break;
      case "hard":
        document.body.className = "hard";
        break;
    }
  }

  function confirmDifficulty() {
    startGame(difficulty);
  }

  function startGame(difficultyLevel) {
    // Initialize based on difficulty
    difficulty = difficultyLevel;
    attempts = 0;
    secretNumber = Math.floor(Math.random() * 100) + 1;

    switch (difficulty) {
      case "easy":
        chances = 10;
        hints = 5;
        break;
      case "medium":
        chances = 5;
        hints = 3;
        break;
      case "hard":
        chances = 1;
        hints = 1;
        break;
    }

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
  }

  function checkGuess() {
    if (chances <= 0) {
      document.getElementById("feedback").textContent =
        "Sorry, no chances left!";
      return;
    }

    let userGuess = document.getElementById("userGuess").value;
    attempts++;

    if (userGuess < secretNumber) {
      chances--;
      document.getElementById(
        "feedback"
      ).textContent = `Too low! You have ${chances} chances left.`;
    } else if (userGuess > secretNumber) {
      chances--;
      document.getElementById(
        "feedback"
      ).textContent = `Too high! You have ${chances} chances left.`;
    } else {
      document.getElementById(
        "feedback"
      ).textContent = `You got it in ${attempts} tries!`;
      document.getElementById("winAnimation").style.display = "block";
      setTimeout(function () {
        document.getElementById("winAnimation").style.display = "none";
      }, 2000);
      document.getElementById("restartButton").style.display = "block";
    }

    if (chances == 0) {
      document.getElementById("feedback").textContent =
        "You've run out of chances!";
      document.getElementById("loseAnimation").style.display = "block";
      setTimeout(function () {
        document.getElementById("loseAnimation").style.display = "none";
      }, 2000);
      document.getElementById("restartButton").style.display = "block";
    }
  }

  function giveHint() {
    if (hints <= 0) {
      document.getElementById("hint").textContent = "No hints left!";
      return;
    }
    hints--;

    let hintMessage = "";
    if (secretNumber >= 1 && secretNumber <= 25) {
      hintMessage = "The number is between 1 and 25.";
    } else if (secretNumber > 25 && secretNumber <= 50) {
      hintMessage = "The number is between 26 and 50.";
    } else if (secretNumber > 50 && secretNumber <= 75) {
      hintMessage = "The number is between 51 and 75.";
    } else {
      hintMessage = "The number is between 76 and 100.";
    }
    document.getElementById("hint").textContent = hintMessage;
  }

  function restartGame() {
    // Show the start screen
    document.getElementById("startScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";

    // Reset the confirm button
    document.getElementById("confirmButton").style.display = "none";

    // Reset feedback and hint messages
    document.getElementById("feedback").textContent = "";
    document.getElementById("hint").textContent = "";

    // Clear the user guess input
    document.getElementById("userGuess").value = "";
  }
});
