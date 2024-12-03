let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg ");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector('#new-btn');

let turn0 = true;
let count = 0;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        //console.log("box was clicked");
        if (turn0) {
            box.innerText = "0";
            box.style.color = "green";
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "red";
            turn0 = true;

        }
        box.disabled = true;
        count++;
        let isWinner = checkWinners();
        if (count == 9 && !isWinner) {
            draw();
        }

        // showWinner();

    })

});
const draw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations ,winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinners = () => {
    for (let pattern of winPattern) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                return true;

            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);