import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "../controllers/list-controller.js";

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
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);
    state.btnClear.addEventListener('click', handleBtnClearClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);

};

function handleInputNumberKeyup(event) {
    state.address.number = event.target.value;
}

async function handleInputCepChange (event) {
    const cep = event.target.value;

    try {
        const address = await addressService.findByCep(cep);

        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;
    
        setFormError("cep", "");
        state.inputNumber.focus();   
    } 
    catch (error) {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        state.inputNumber.value = "";
        setFormError("cep", "Informe um CEP válido");
        state.inputCep.focus();
    }
}

function handleBtnSaveClick(event){
    event.preventDefault();

    const errors = addressService.getErrors(state.address);

    const keys = Object.keys(errors);

    if (keys.length > 0){
        keys.forEach( key => {
            setFormError(key, errors[key]);
        })
    }
    else {
        listController.addCard(state.address);
        clearForm();
    }

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

    state.address = new Address();

    state.inputCep.focus();
}

function setFormError (key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

export {init};