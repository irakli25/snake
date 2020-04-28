import {Snake} from "./snake.js";
import {Food} from "./food.js";
import {Storage} from "./storage.js";
import {gameStartSpeed, speedChange, levelUp} from "./../config.js";

class Game{
    constructor () {
        this.snake = new Snake();
        this.food = new Food();
        this.storage = new Storage();
        this.speed = gameStartSpeed;
        this.score = 0;
        this.level = 1;
        this.record = this.storage.get("record") === null ? 0 : this.storage.get("record");
        this.interval = "";
      
        //   joystick buttons
            document.querySelector("button[direction='left']").addEventListener("click", () => {
                if(this.snake.direction != "right" && this.snake.changeDirection){
                    this.snake.direction = "left";
                    this.snake.changeDirection = false;
                }
                    
            })

            document.querySelector("button[direction='right']").addEventListener("click", () => {
                if(this.snake.direction != "left" && this.snake.changeDirection){
                    this.snake.direction = "right";
                    this.snake.changeDirection = false;
                }
            })

            document.querySelector("button[direction='up']").addEventListener("click", () => {
                if(this.snake.direction != "down" && this.snake.changeDirection){
                    this.snake.direction = "up";
                    this.snake.changeDirection = false;
                }
            })

            document.querySelector("button[direction='down']").addEventListener("click", () => {
                if(this.snake.direction != "up" && this.snake.changeDirection){
                    this.snake.direction = "down";
                    this.snake.changeDirection = false;
                }
            })

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

    play = (clear = "") => {
        const pointText = document.getElementById("pointText");
        const levelText = document.getElementById("levelText");

        clearInterval(clear); // if recursion
        this.interval = setInterval(() => {
    
            pointText.innerHTML = this.score;
            levelText.innerHTML = this.level;

            if(this.snake.live){
                const container = document.getElementById("container");
                container.innerHTML="";
                this.snake.move();
                this.food._draw();
                if(this.snake.eat(this.food.place())){
                    this.food.change();
                    this.score++;
                    if(this.score % levelUp == 0){
                        this.level++;
                        this.speed /= speedChange;
                        this.play(this.interval);  // recursion
                    }
                }
            }
            else{ // game over
                clearInterval(this.interval); 
                if (this.score > this.record){
                    this.storage.add("record", this.score);
                    this.record = this.score;
                }
                const recordElement = document.getElementById("endRecordText");
                recordElement.innerHTML = this.record;
                const scoreElement = document.getElementById("yourScoreText");
                scoreElement.innerHTML = this.score;

            }
            
            
        },  this.speed);
        
    }

    _stop = () =>{
        clearInterval(this.interval);
    }


    
}

export {Game};