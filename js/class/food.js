class Food {
    constructor (){
        this.x = Math.floor(Math.random() * 28);
        this.y = Math.floor(Math.random() * 28);
        this.size = 10;
    }

    _draw = (item) => {
        const food= document.createElement("div");
        const container = document.getElementById("container");
        food.classList.add("food");
        food.style.left = `${this.size*this.x}px`;
        food.style.top = `${this.size*this.y}px`;
        container.appendChild(food);
    }

    place = () => {
        const item = {x : this.x, y : this.y};
        return item;
    }
    
    change = () => {
        this.x = Math.floor(Math.random() * 28);
        this.y = Math.floor(Math.random() * 28);
    }
}

export {Food};