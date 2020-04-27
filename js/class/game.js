import {Snake} from "./snake.js";
import {Food} from "./food.js";


class Game{
    constructor () {
        this.snake = new Snake();
        this.food = new Food();
        this.speed = 500;
        this.score = 0;
        this.level = 1;
    }

    play = (clear = "") => {
        clearInterval(clear); // if recursion
        const interval = setInterval(() => {
    
            if(this.snake.live){
                const container = document.getElementById("container");
                container.innerHTML="";
                this.snake.move();
                this.food._draw();
                if(this.snake.eat(this.food.place())){
                    this.food.change();
                    this.score++;
                    if(this.score % 5 == 0){
                        this.level++;
                        this.speed /= 2;
                        this.play(interval);  // recursion
                    }
                }
            }
            
            
        },  this.speed);
    }
    
}

export {Game};