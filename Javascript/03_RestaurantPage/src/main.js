import './styles.scss';
import { Home, Menu, About, Reservation } from "./modules";

const btns = document.querySelectorAll(".btn");

btns.forEach((element, index) => {
    element.addEventListener("click", () => {new [Home, Menu, About, Reservation][index]()})
});