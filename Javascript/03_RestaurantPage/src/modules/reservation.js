import Inserter from "./inserter";
import content from "../content/reservation";

export default class Reservation extends Inserter {
    constructor(callback) {
        super();
        this.addElement(this.processData(content));
        this.elements = {
            "title": document.querySelectorAll("h2")[0],
            "form": document.querySelector(".reservation"),
            "success": document.querySelector(".rsuccess"),
            "fail": document.querySelector(".rfail")
        };
        this.return = callback;
        this.elements["form"].addEventListener("submit", (e) => this.checkSubmission(e));
    }
    checkSubmission(e) {
        e.preventDefault();
        console.log(e)
        this.elements["form"].classList.add("hidden");

        const returnBtn = document.createElement("button");
        returnBtn.innerText = "Back";
        returnBtn.addEventListener("click", () => new this.return())

        let isSuccessful = Math.random() < 0.7;
        const data = new FormData(e.target);
        const reservationDate = new Date(data.get("date"));
        const currentDate = new Date();

        if(isSuccessful && (reservationDate > currentDate)) {
            this.elements["title"].innerText = "Reservation successful."
            this.elements["success"].classList.remove("hidden");
            this.elements["fail"].appendChild(returnBtn);
        } else {
            this.elements["title"].innerText = "Sorry, we're full."
            this.elements["fail"].classList.remove("hidden");
        }

        this.elements["title"].parentNode.appendChild(returnBtn)
    }
}