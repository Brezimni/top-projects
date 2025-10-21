export default class Inserter {
    constructor() {
        this.container = document.querySelector(".center");
    }
    
    addElement(element) {
        this.container.innerHTML = "";
        this.container.appendChild(element);
    }

    processData(data) {
        const wrapper = document.createElement("div");
        for (const d of data) {
            let el = document.createElement(d.type);
            el.textContent = d.text;
            wrapper.appendChild(el);
        }
        return wrapper;
    }
}