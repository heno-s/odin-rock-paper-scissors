const options = ["rock", "paper", "scissors"]; // if new options are added, expand also winScenarios variable

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
    let result = { text: "", computerWin: false, playerWin: false };

    if (playerChoice === computerChoice) {
        result.text = "It is a tie!";
    } else if (winScenarios.includes(battle)) {
        result.text = `You win! ${playerChoice} beats ${computerChoice}`;
        result.playerWin = true;
    } else {
        result.text = `You lose! ${playerChoice} cannot beat ${computerChoice}`;
        result.computerWin = true;
    }

    return result;
}

function game() {
    const score = {
        player: 0,
        computer: 0,
    };

    let latestChoice = "rock";

    for (let i = 0; i < 5; i++) {
        const playerChoice = (latestChoice = prompt("rock, paper, scissors", latestChoice).trim());

        const roundResult = playRound(playerChoice, computerPlay());
        console.log(roundResult.text);

        if (roundResult.playerWin) {
            score.player++;
        } else if (roundResult.computerWin) {
            score.computer++;
        }
    }

    const finalResult = { text: "", computerWin: false, playerWin: false };

    if (score.player === score.computer) {
        finalResult.text = "The game ended as a tie.";
    } else if (score.player > score.computer) {
        finalResult.text = "You are the final winner of the game, congratulations!";
        finalResult.playerWin = true;
    } else {
        finalResult.text = "The final winner of the game is computer!";
        finalResult.computerWin = true;
    }

    return finalResult;
}
