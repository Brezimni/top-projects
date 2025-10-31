import Inserter from "./inserter"; 
import content from "../content/home";

export default class Home extends Inserter {
    constructor() {
        super();
        this.addElement(this.processData(content));
    }
    renderSelf() {
        this.addElement(this.processData(content));
    }
}