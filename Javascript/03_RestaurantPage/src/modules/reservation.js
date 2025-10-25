import Inserter from "./inserter";
import content from "../content/reservation";

export default class Reservation extends Inserter {
    constructor() {
        super();
        this.addElement(this.processData(content));
    }
}