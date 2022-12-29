import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";

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

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);

};

async function handleInputCepChange (event) {
    const cep = event.target.value;
    const address = await addressService.findByCep(cep);

    console.log(address);
}

async function handleBtnSaveClick(event){
    event.preventDefault();
    console.log(event.target);
}

function handleInputNumberChange(event){
    if(event.target.value == ""){
        setFormError("number", "Campo Requerido");
    }
    else{
        setFormError("number", "");
    }
}

function handleBtnClearClick (event) {
    event.preventDefault();
    clearForm();
}

function clearForm(){
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.inputCep.focus();
}

function setFormError (key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

export {init};