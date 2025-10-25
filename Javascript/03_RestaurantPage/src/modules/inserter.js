import parser from "./parser";

export default class Inserter {
    constructor() {
        this.container = document.querySelector(".center");
    }
    
    addElement(element) {
        this.container.innerHTML = "";
        this.container.appendChild(element);
    }
    
    processData(data) {
        return parser(data)
    }
}