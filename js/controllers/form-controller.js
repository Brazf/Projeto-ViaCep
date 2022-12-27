import Address from "../models/address.js";

// NA FUNÇÃO CONSTRUTURA STATE (ESTADO) VOU GUARDAR AS INFORMAÇÕES MAIS IMPORTANTE DO MEU PROJETO
function State () {

    this.address = new Address();

    this.btnSave = null;
    this.btnClear = null;

    this.inputCep = null;
    this.inputStreet = null;
    this.inputNumber = null;
    this.inputCity = null;

    this.errorCep = null;
    this.errorNumber = null;
}

const state = new State();

function init () {

    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.save;
    state.btnClear = document.forms.newAddress.clear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    console.log(state);
};

export {init};