import Inserter from "./inserter";

export default class About extends Inserter {
    #DATA = [ {
        type: "p", 
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Aliquam ultricies, enim eu accumsan luctus, nisi ipsum semper arcu, \
        vitae condimentum justo ex vitae justo. Nulla suscipit eleifend eros, \
        ac blandit odio pharetra ut. Nullam ligula est, egestas vulputate lorem ac, \
        scelerisque auctor dolor. Suspendisse venenatis fermentum molestie. \
        Cras non dictum ligula, et ullamcorper arcu. \
        Sed et velit diam. Nullam maximus ultrices leo sit amet ultricies. \
        Phasellus sem purus, molestie in luctus id, cursus at arcu. \
        In feugiat imperdiet imperdiet. Quisque placerat suscipit tortor nec porttitor. \
        Vestibulum tempus tristique bibendum. "
    } ];
    constructor() {
        super();
        this.addElement(this.processData(this.#DATA));
    }
}