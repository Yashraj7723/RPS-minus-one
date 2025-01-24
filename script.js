let yourscore = 0;
let opponentscore = 0;
let yourwins = 0;
let opponentwins = 0;
let you;
let opponent;

let choices = ["Rock", "Paper", "Scissors"];
let yourchoice0;
let yourchoice1;
let opponentchoice0;
let opponentchoice1;
let instruction;
let rounds = 0;

window.onload = function () {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".jpg";
        choice.addEventListener("click", selectchoice);
        document.getElementById("choices").append(choice);
    }
    yourchoice0 = document.getElementById("your-choice0");
    yourchoice1 = document.getElementById("your-choice1");
    opponentchoice0 = document.getElementById("opponent-choice0");
    opponentchoice1 = document.getElementById("opponent-choice1");
    
    yourchoice0.addEventListener("click", minusone);
    yourchoice1.addEventListener("click", minusone);

    instruction = document.getElementById("instruction");
}

function selectchoice() {
    if (yourchoice0.src.includes("Blank.png")) {
        yourchoice0.src = this.id + ".jpg";
    } else if (yourchoice1.src.includes("Blank.png")) {
        yourchoice1.src = this.id + ".jpg";
        for (let i = 0; i < 2; i++) {
            let opponentchoice = choices[Math.floor(Math.random() * 3)];
            document.getElementById(`opponent-choice${i}`).src = opponentchoice + ".jpg";
        }
        document.getElementById("choices").style.display = "none";
        instruction.innerText = "minus one";
    }
}

function minusone() {
    if (!yourchoice0.src.includes("Blank.png") && !yourchoice1.src.includes("Blank.png") && !you && !opponent) {

        yourchoice0.classList.add("hover-effect");
        yourchoice1.classList.add("hover-effect");

        if (this == yourchoice0) {
            yourchoice1.hidden = true;
        } else {
            yourchoice0.hidden = true;
        }
        let n = Math.floor(Math.random() * 2);
        let opponentchoice;
        if (n == 0) {
            opponentchoice = opponentchoice0;
            opponentchoice1.hidden = true;
        } else {
            opponentchoice = opponentchoice1;
            opponentchoice0.hidden = true;
        }

        function getimagename(img) {
        let imgsrcarray = img.src.split("/");
        return imgsrcarray[imgsrcarray.length - 1];
        } 

        for (let i = 0; i < choices.length; i++) {
            if (getimagename(this).includes(choices[i])) {
                you = choices[i];
            }
            if (getimagename(opponentchoice).includes(choices[i])) {
                opponent = choices[i];    
            }
        }
        checkwinner();
    }
}

function playwin() {
    let winSound = new Audio('win.mp3');
    winSound.play();
}

// function playlost() {
//     let loseSound = new Audio('lose.mp3');
//     loseSound.play();
// }

function checkwinner() {
    if (you != opponent) {  
        if (you == "Rock") {
            if (opponent == "Scissors") {
                yourscore += 1;
                instruction.innerText = "Wins!";
                // playwin();
            } else if (opponent == "Paper") {
                opponentscore += 1;
                instruction.innerText = "Lose!";
                // playlost();
            }
        } else if (you == "Paper") {
            if (opponent == "Rock") {
                yourscore += 1;
                instruction.innerText = "Wins!";
                // playwin();
            } else if (opponent == "Scissors") {
                opponentscore += 1;
                instruction.innerText = "Lose!";
                // playlost();
            }
        } else if (you == "Scissors") {
            if (opponent == "Paper") {
                yourscore += 1;
                instruction.innerText = "You Win!";
                // playwin();
            } else if (opponent == "Rock") {
                opponentscore += 1;
                instruction.innerText = "You Lose!";
                // playlost();
            }
        }

        document.getElementById("your-score").innerText = yourscore;
        document.getElementById("opponent-score").innerText = opponentscore;
    }

    rounds++;

    // instruction.innerText = " Round " + (rounds + 1);

    if (rounds < 3 && Math.abs(yourscore - opponentscore) < 2) {
        setTimeout(clearchoices, 3000);
    } else {
        setTimeout(endgame, 1000);
    }
}

function clearchoices() {
    you = null;
    opponent = null;

    opponentchoice0.src = "Blank.png";
    opponentchoice1.src = "Blank.png";
    yourchoice0.src = "Blank.png";
    yourchoice1.src = "Blank.png";

    opponentchoice0.hidden = false;
    opponentchoice1.hidden = false;
    yourchoice0.hidden = false;
    yourchoice1.hidden = false;

    document.getElementById("choices").style.display = "flex";
    instruction.innerText = "Rock Paper Scissors!" + "\n" +" Round " + (rounds + 1);
}

function endgame() {
    if (yourscore > opponentscore) {
        yourwins++;
        instruction.innerText = "You won the game!";
    } else {
        opponentwins++;
        instruction.innerText = "Opponent won the game!";
    }

    if (yourwins == 2 || opponentwins == 2) {
        resetgame();
    } else {
        // Show the custom dialog box
        document.getElementById("game-dialog").style.display = "flex";

        // Handling the "Yes" button click
        document.getElementById("play-again-yes").addEventListener("click", function() {
            resetgame();
            document.getElementById("game-dialog").style.display = "none";
        });

        // Handling the "No" button click
        document.getElementById("play-again-no").addEventListener("click", function() {
            instruction.innerText = "Thanks for playing!";
            document.getElementById("game-dialog").style.display = "none";
        });
    }
}

function resetgame() {
    rounds = 0;
    yourscore = 0;
    opponentscore = 0;

    document.getElementById("your-score").innerText = yourscore;
    document.getElementById("opponent-score").innerText = opponentscore;

    clearchoices();
}

// function getimagename(img) {
//     let imgsrcarray = img.src.split("/");
//     return imgsrcarray[imgsrcarray.length - 1];
// }
