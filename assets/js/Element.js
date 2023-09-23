export default class Element {
    constructor(id) {
        this.id = id
    }


    toDark(update) {
        document.querySelector(this.id).classList.toggle(update)
    }
}