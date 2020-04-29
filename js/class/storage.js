class Storage {
    constructor(){

    }
    add = (name,item) =>{ // add storage
        if(name != "")
        localStorage.setItem(`_Snake_${name}_`,item);
    }
    get = (name) => {  // get storage
        return localStorage.getItem(`_Snake_${name}_`);
    }
    remove = (name) => { // remove storage
        delete localStorage[`_Snake_${name}_`];
    }

    
}

export {Storage};