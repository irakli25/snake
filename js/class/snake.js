class Snake {
    constructor () {
        this.body = [ {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0} ];
        this.bodyElementSize = 10;
        this.direction = "right";
        this.live = true;
        this.changeDirection = true;
        this.walls = document.getElementById("walls").checked;

        document.addEventListener("keydown",(e) => {
            const key = e.keyCode;
            switch (key){
                case 37: if(this.direction != "right" && this.changeDirection) this.direction = "left"; document.querySelector("button[direction='left']").classList.add("active"); break;
                case 38: if(this.direction != "down" && this.changeDirection) this.direction = "up";    document.querySelector("button[direction='up']").classList.add("active"); break;
                case 39: if(this.direction != "left" && this.changeDirection) this.direction = "right"; document.querySelector("button[direction='right']").classList.add("active"); break;
                case 40: if(this.direction != "up" && this.changeDirection) this.direction = "down";    document.querySelector("button[direction='down']").classList.add("active"); break;
            }
            this.changeDirection = false;
        })

        document.addEventListener("keyup",(e) => {
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
        return this.body.length;
    }

    _draw = (item, index) => {

        if(item.x === this.body[this._length() -1].x && item.y === this.body[this._length() -1].y  &&  index !== this._length() -1){
            this._death();
        }

        const bodyElement = document.createElement("div");
        const container = document.getElementById("container");
        bodyElement.classList.add("bodyElement");
        bodyElement.style.left = `${this.bodyElementSize*item.x}px`;
        bodyElement.style.top = `${this.bodyElementSize*item.y}px`;
        container.appendChild(bodyElement);
    }

    _getSnake = () => {
        this.body.map(this._draw);
    }

    move = ()  => {
        switch(this.direction){
            case "up" : this.body.map(this._up); break;
            case "down" : this.body.map(this._down); break;
            case "left" : this.body.map(this._left); break;
            case "right" : this.body.map(this._right); break;
        }
        
        this._getSnake();
        this.changeDirection = true;
    }

    _right = (item,index) => {
        if(index == this._length() -1){
            item.x ++;
        }
        else{
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }

        if(item.x > 28){
            if(this.walls){
                this._death();
            }
            else
                item.x  = 0;
        }
        
    }

    _left = (item,index) => {
        
        if(item.x < 1 && item.x != -1){
            if(this.walls){
                this._death();
            }
            else
                item.x  = 28;
        }

        if(index == this._length() -1){
            item.x --;
        }
        else{
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }
        
    }

    _down = (item,index) => {
        if(index == this._length() -1){
            item.y ++;
        }
        else{
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }

        if(item.y > 28){
            if(this.walls){
                this._death();
            }
            else
                item.y  = 0;
        }
        
    }

    _up = (item,index) => {
        
        if(item.y < 1 && item.y != -1){
            if(this.walls){
                this._death();
            }
            else
                item.y  = 28;
        }

        if(index == this._length() -1){
            item.y --;
        }
        else{
            this.body[index].x = this.body[index+1].x;
            this.body[index].y = this.body[index+1].y;
        }
        
    }

    eat = (item) =>{

        if(item.x === this.body[this._length() - 1].x && item.y === this.body[this._length() - 1].y){
            const newItem = {
                x : -1,
                y : -1 
              }
      
              this.body.unshift(newItem);
              return true;
        }

        return false;
        


    }

    _death = () => {
        this.live = false;
        document.getElementById("endGameSection").classList.remove("hide");
    }
}

export {Snake};