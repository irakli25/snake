import {elementSize, screenSize} from "./../config.js";

class Food {
    constructor (){
        // random coordinates
        this.x = Math.floor(Math.random() * screenSize);
        this.y = Math.floor(Math.random() * screenSize);
        // food size
        this.size = elementSize;
    }

    _draw = (item) => { // draw food
        const food= document.createElement("div");
        const container = document.getElementById("container");
        food.classList.add("food");
        food.style.left = `${this.size*this.x}px`;
        food.style.top = `${this.size*this.y}px`;
        container.appendChild(food);
    }

    place = () => { // return food place
        const item = {x : this.x, y : this.y};
        return item;
    }
    
    change = () => { // change food coordinates
        this.x = Math.floor(Math.random() * screenSize);
        this.y = Math.floor(Math.random() * screenSize);
    }
}

export {Food};