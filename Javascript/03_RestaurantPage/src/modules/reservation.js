import Inserter from "./inserter";

export default class Reservation extends Inserter {
    #DATA = [ {type: "div", text: "Book a place at our table."}, {type: "input", text: "tadnoefe epfef"}, {type: "button", text: "send"} ];
    constructor() {
        super();
        this.addElement(this.processData(this.#DATA));
    }
}