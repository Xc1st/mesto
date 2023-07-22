export default class FormValidator {
constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
    this._inputList = Array.from(
        formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    this._buttonSave = this._formElement.querySelector(
        this._validationConfig.submitButtonSelector
    );
}

_showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
};

_hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = "";
};

_checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
};

_hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

_toggleButtonState = () => {
    if (this._hasInvalidInput()) {
        this._buttonSave.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonSave.setAttribute("disabled", true);
    } else {
        this._buttonSave.classList.remove(
            this._validationConfig.inactiveButtonClass
        );
        this._buttonSave.removeAttribute("disabled");
    }
};

_setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
};

resetValid = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
};

enableValidation = () => {
    this._setEventListeners();
};
}