
import {Game} from "./class/game.js";
import {Storage} from "./class/storage.js";



// Elements
const startGame = document.getElementById("startGame");
const startGameSection = document.getElementById("startGameSection");
const restartGame = document.getElementById("restartGame");
const endGameSection = document.getElementById("endGameSection");
const startRecordText = document.getElementById("startRecordText");
const mainStorage = new Storage();

// get device record
startRecordText.innerHTML = mainStorage.get("record") === null ? 0 : mainStorage.get("record");

// start game
startGame.addEventListener("click", (element) =>  {
    startGameSection.classList.add("hide"); 
    const game = new Game();
    game.play();
})

// restart game
restartGame.addEventListener("click", () => {
    endGameSection.classList.add("hide");
    const game = new Game();
    game.play();
})











