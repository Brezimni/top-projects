import './styles.scss';
import { Home, Menu, About, Reservation } from "./modules";
import content from "./content/layout";
import parser from './modules/parser';

(function onStart(element) {
    const body = document.body;
    while (element.firstChild) {
        body.appendChild(element.firstChild);
    }
    new Home();
})(parser(content))

const btns = document.querySelectorAll(".btn");
btns.forEach((element, index) => {
    element.addEventListener("click", () => {new [Home, Menu, About, Reservation][index](Home /*callback*/)})
});