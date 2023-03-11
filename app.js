// Some Initial values of variables

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
let userClickedPattern = [];
let playing = false;
let level = 0;

const buttonElements = document.querySelectorAll("div.btn");
const levelTitle = document.getElementById("level-title");

// Set an EL to the body to listen to any Key Press;
document.addEventListener("keydown", () => {
  if (!playing) {
    playing = true;
    nextSequence();
    
    // Set EL to all of the buttons;
    buttonElements.forEach((button) => {
      button.addEventListener("click", handleClick);
    });
  }
});

// Button click Handler
function handleClick(e) {
  const userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer();

}

//Next Sequence f() create the next sequence of the game;
const nextSequence = () => {
  const randomNumber = Math.round(Math.random() * 3);
  const randomChosenColor = buttonColors[randomNumber];
  const buttonElementColor = document.getElementById(`${randomChosenColor}`);
  level += 1;
  levelTitle.innerText = `Level ${level}`;
  gamePattern.push(randomChosenColor);
  flashButton(buttonElementColor);
  playSound(randomChosenColor);
};

// checks the answer;
const checkAnswer = () => {
  const lastIndex = userClickedPattern.length - 1;
  if (userClickedPattern[lastIndex] === gamePattern[lastIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    levelTitle.innerText = "Game Over, Press Any Key to Restart";

    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("game-over");
    setTimeout(() => {
      bodyElement.classList.remove("game-over");
    }, 200);
    playSound("wrong");
    startOver();
    
  }
};

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const flashButton = (button) => {
  let op = 1;
  let timer = setInterval(() => {
    if (op <= 0.1) {
      clearInterval(timer);
      op = 1;
    }
    button.style.opacity = op;
    op -= op * 0.1;
  }, 05);
};

const animatePress = (currentColor) => {
  const buttonPressed = document.getElementById(`${currentColor}`);
  buttonPressed.classList.add("pressed");
  setTimeout(() => {
    buttonPressed.classList.remove("pressed");
  }, 80);
};

const startOver = () => {
    playing = false;
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
  }
  