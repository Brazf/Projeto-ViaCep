import * as modalController from "../controllers/modal-controller.js";

export function init () {

    const contactLink = document.querySelector(".contact-link");

    contactLink.addEventListener('click', handlecontactLinkClick);

}

function handlecontactLinkClick (event) {
    event.preventDefault();
    modalController.showModal();
}