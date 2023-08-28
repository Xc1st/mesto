import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._form.querySelectorAll(".popup__input")
        this._buttonSubmit = this._form.querySelector(".popup__save");
        this._defaultText = this._buttonSubmit.textContent;
    }

    _getInputsValue() {
        this._values = {};
        this._inputList.forEach(input => {
            this._values[input.name] = input.value;
        });
        return this._values;
    }
    setInputsValue(element) {
        this._inputList.forEach(input => {
            input.value = element[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`
            this._handleSubmit(this._getInputsValue());
        });
    }

    DefaultText() { 
        this._buttonSubmit.textContent = this._defaultText;
    }

    close() {
        super.close();
        this._form.reset();
    }
}