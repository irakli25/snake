import {elementSize, screenSize} from "./../config.js";

class Snake {
    constructor () {
        this.body = [ {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0} ]; // little snake
        this.bodyElementSize = elementSize; // snake element in px
        this.direction = "right"; // start direction
        this.live = true;
        this.changeDirection = true; // can change direction
        this.walls = document.getElementById("walls").checked; // is walls ?

        document.addEventListener("keydown",(e) => { // keydown function change direction and animate joystick buttons
            const key = e.keyCode;
            switch (key){
                case 37: if(this.direction != "right" && this.changeDirection) this.direction = "left"; document.querySelector("button[direction='left']").classList.add("active"); break;
                case 38: if(this.direction != "down" && this.changeDirection) this.direction = "up";    document.querySelector("button[direction='up']").classList.add("active"); break;
                case 39: if(this.direction != "left" && this.changeDirection) this.direction = "right"; document.querySelector("button[direction='right']").classList.add("active"); break;
                case 40: if(this.direction != "up" && this.changeDirection) this.direction = "down";    document.querySelector("button[direction='down']").classList.add("active"); break;
            }
            this.changeDirection = false; // stop change direction while not draw
        })

        document.addEventListener("keyup",(e) => { // keyup function for animate joystick buttons
            const key = e.keyCode;
            switch (key){
                case 37: document.querySelector("button[direction='left']").classList.remove("active"); break;
                case 38: document.querySelector("button[direction='up']").classList.remove("active"); break;
                case 39: document.querySelector("button[direction='right']").classList.remove("active"); break;
                case 40: document.querySelector("button[direction='down']").classList.remove("active"); break;
            }
            
        })
    }

    _length = () => {
        return this.body.length; // return snake length
    }

    _draw = (item, index) => { // draw snake

        // if clash himself
        if(item.x === this.body[this._length() -1].x && item.y === this.body[this._length() -1].y  &&  index !== this._length() -1){
            this._death();
        }
        // draw
        const bodyElement = document.createElement("div");
        const container = document.getElementById("container");
        bodyElement.classList.add("bodyElement");
        bodyElement.style.left = `${this.bodyElementSize*item.x}px`;
        bodyElement.style.top = `${this.bodyElementSize*item.y}px`;
        container.appendChild(bodyElement);
    }

    _getSnake = () => { // update snake
        this.body.map(this._draw);
    }

    move = ()  => { // snake move function
        switch(this.direction){
            case "up" : this.body.map(this._up); break;
            case "down" : this.body.map(this._down); break;
            case "left" : this.body.map(this._left); break;
            case "right" : this.body.map(this._right); break;
        }
        
        this._getSnake();
        this.changeDirection = true; // draw done and can change direction
    }

    _right = (item,index) => { // snake go right
        if(index == this._length() -1){ // if head
            item.x ++;
        }
        else{
            // else every n element in body n = n+1
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }

        if(item.x > screenSize){ 
            if(this.walls){ // if walls
                this._death();
            }
            else
                item.x  = 0;
        }
        
    }

    _left = (item,index) => { // snake go left
        
        if(item.x < 1 && item.x != -1){
            if(this.walls){  // if walls
                this._death();
            }
            else
                item.x  = screenSize;
        }

        if(index == this._length() -1){ // if head
            item.x --;
        }
        else{
            // else every n element in body n = n+1
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }
        
    }

    _down = (item,index) => { // snake go down
        if(index == this._length() -1){ // if head
            item.y ++;
        }
        else{
            // else every n element in body n = n+1
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }

        if(item.y > screenSize){
            if(this.walls){
                this._death();
            }
            else
                item.y  = 0;
        }
        
    }

    _up = (item,index) => { // snake go up
        
        if(item.y < 1 && item.y != -1){
            if(this.walls){
                this._death();
            }
            else
                item.y  = screenSize;
        }

        if(index == this._length() -1){ // if head
            item.y --;
        }
        else{
            // else every n element in body n = n+1
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }
        
    }

    eat = (item) =>{ // snake eat function

        if(item.x === this.body[this._length() - 1].x && item.y === this.body[this._length() - 1].y){ // if eat food
            const newItem = { // creat new body element
                x : -1,
                y : -1 
              }
      
              this.body.unshift(newItem); // add new element
              return true;
        }

        return false;
        


    }

    _death = () => { // snake death function
        this.live = false;
        document.getElementById("endGameSection").classList.remove("hide");
    }
}

export {Snake};