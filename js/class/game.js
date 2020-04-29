import {Snake} from "./snake.js";
import {Food} from "./food.js";
import {Storage} from "./storage.js";
import {gameStartSpeed, speedChange, levelUp} from "./../config.js";

class Game{
    constructor () {
        this.snake = new Snake();
        this.food = new Food();
        this.storage = new Storage();
        this.speed = gameStartSpeed; // game speed from config.js
        this.score = 0;
        this.level = 1;
        this.record = this.storage.get("record") === null ? 0 : this.storage.get("record");
        this.interval = ""; 
      
        //   joystick buttons functions
                
            // move left
            document.querySelector("button[direction='left']").addEventListener("click", () => {
                if(this.snake.direction != "right" && this.snake.changeDirection){
                    this.snake.direction = "left";
                    this.snake.changeDirection = false;
                }
                    
            })
            // move right
            document.querySelector("button[direction='right']").addEventListener("click", () => {
                if(this.snake.direction != "left" && this.snake.changeDirection){
                    this.snake.direction = "right";
                    this.snake.changeDirection = false;
                }
            })
            // move up
            document.querySelector("button[direction='up']").addEventListener("click", () => {
                if(this.snake.direction != "down" && this.snake.changeDirection){
                    this.snake.direction = "up";
                    this.snake.changeDirection = false;
                }
            })
            // move down
            document.querySelector("button[direction='down']").addEventListener("click", () => {
                if(this.snake.direction != "up" && this.snake.changeDirection){
                    this.snake.direction = "down";
                    this.snake.changeDirection = false;
                }
            })
            // game stop end play Button
            document.getElementById("stopPlayButton").addEventListener("click", (element) => {
                const button = document.getElementById("stopPlayButton");
                const action = button.getAttribute("action");
                switch(action){
                    case "Stop" : this._stop(); button.setAttribute("action", "Play"); break;
                    case "Play" : this.play(); button.setAttribute("action", "Stop"); break;
                }
                button.innerHTML = button.getAttribute("action");
            })
        ///
    }
    // Game play function
    play = (clear = "") => {
        const pointText = document.getElementById("pointText");
        const levelText = document.getElementById("levelText");

        if(clear != "")
            clearInterval(clear); //  clear this.interval, if transfer

        this.interval = setInterval(() => { // game interval function
    
            pointText.innerHTML = this.score;
            levelText.innerHTML = this.level;

            if(this.snake.live){ // if snake live
                const container = document.getElementById("container");
                container.innerHTML=""; // clear game screen
                this.snake.move(); // move snake
                this.food._draw(); // draw snake
                if(this.snake.eat(this.food.place())){ // if snake eat
                    this.food.change(); // change food coordinates
                    this.score++; // score increase
                    if(this.score % levelUp == 0){ // if score is multiple levelUp 
                        this.level++; // level increase
                        this.speed /= speedChange; // speed increase speedChange times
                        this.play(this.interval);  // recursion with this.interval, clear interval end repeat with new speed
                    }
                }
            }
            else{ // game over
                clearInterval(this.interval); // end interval
                if (this.score > this.record){ // if score is new record, change in localStorage
                    this.storage.add("record", this.score);
                    this.record = this.score;
                }
                // get score and record
                const recordElement = document.getElementById("endRecordText");
                recordElement.innerHTML = this.record;
                const scoreElement = document.getElementById("yourScoreText");
                scoreElement.innerHTML = this.score;

            }
            
            
        },  this.speed); // interval speed
        
    }

    // Game stop function
    _stop = () =>{
        clearInterval(this.interval); // end interval
    }


    
}

export {Game};