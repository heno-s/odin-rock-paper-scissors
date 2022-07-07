const choices = [...document.querySelectorAll(".choice")];
const modal = document.querySelector("dialog");
const modalBtn = modal.querySelector(".replay-button");
const promptElement = document.querySelector(".prompt");
const roundResult = document.querySelector(".result");
const finalResult = modal.querySelector(".final-result");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");

choices.forEach((choice) => {
    choice.addEventListener("click", function (evt) {
        promptElement.style.visibility = "hidden";
        playRound(this.dataset.choice, computerPlay());
        roundResult.style.visibility = "visible";
    });
});

modal.addEventListener("close", resetGame);

modalBtn.addEventListener("click", (evt) => modal.close());

const options = ["rock", "paper", "scissors"]; // if new options are added, expand also winScenarios variable
let score = {
    player: 0,
    computer: 0,
};
score = new Proxy(score, {
    set(target, property, value) {
        target[property] = value;
        if (property === "player") {
            playerScore.textContent = value;
        } else {
            computerScore.textContent = value;
        }
    },
});

function computerPlay() {
    const indexOfChoice = Math.floor(Math.random() * options.length);
    const choice = options[indexOfChoice];
    return choice;
}

function playRound(playerChoice, computerChoice) {
    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (!options.includes(playerChoice)) {
        throw new Error("Incorrect user input");
    }

    const battle = `${playerChoice} ${computerChoice}`;
    const winScenarios = ["rock scissors", "paper rock", "scissors paper"];

    if (playerChoice === computerChoice) {
        roundResult.textContent = "It is a tie!";
    } else if (winScenarios.includes(battle)) {
        roundResult.textContent = `You win! ${playerChoice} beat${playerChoice === "scissors" ? "" : "s"} ${computerChoice}`;
        score.player++;
    } else {
        roundResult.textContent = `You lose! ${playerChoice} cannot beat ${computerChoice}`;
        score.computer++;
    }

    if (score.player === 5 || score.computer === 5) {
        showFinalAnnouncement(score.player === 5 ? "player" : "computer");
    }
}

function showFinalAnnouncement(winner) {
    if (winner === "player") {
        finalResult.textContent = "You are the final winner of the game! Congratulations";
    } else {
        finalResult.textContent = "The final winner of the game is computer. Maybe next time.";
    }
    modal.showModal();
}

function resetGame() {
    finalResult.textContent = "";
    promptElement.style.visibility = "visible";
    roundResult.style.visibility = "hidden";
    score.player = 0;
    score.computer = 0;
}
