import Inserter from "./inserter";

export default class Menu extends Inserter {
    #DATA = [ {
        type: "p", 
        text:"Menu item 1"
    },
    {
        type: "p", 
        text:"Menu item 2"
    },
    {
        type: "p", 
        text:"Menu item 3"
    },
    {
        type: "p", 
        text:"Menu item 4"
    },
    {
        type: "p", 
        text:"Menu item 5"
    },
];
    constructor() {
        super();
        this.addElement(this.processData(this.#DATA));
    }
}