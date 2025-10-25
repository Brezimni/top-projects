import Inserter from "./inserter";
import content from "../content/menu";

export default class Menu extends Inserter {
    constructor() {
        super();
        this.addElement(this.processData(content));
    }
}