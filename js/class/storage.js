class Storage {
    constructor(){

    }
    add = (name,item) =>{
        if(name != "")
        localStorage.setItem(`_Snake_${name}_`,item);
    }
    get = (name) => {
        return localStorage.getItem(`_Snake_${name}_`);
    }
    remove = (name) => {
        delete localStorage[`_Snake_${name}_`];
    }

    
}

export {Storage};