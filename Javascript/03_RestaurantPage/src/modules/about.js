import Inserter from "./inserter";
import content from "../content/about";

export default class About extends Inserter {
    constructor() {
        super();
        this.addElement(this.processData(content));
    }
}