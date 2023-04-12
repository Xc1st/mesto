const validationConfig = {
    allForms: document.forms,
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    ErrorTypeSelector: '.popup__error_type_',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
enableValidation(validationConfig);

function enableValidation({ allForms, inputSelector, submitButtonSelector, ...rest }) {
    const formList = Array.from(allForms);
    formList.forEach((formElement) => {
        const inputList = formElement.querySelectorAll(inputSelector);
        const buttonElement = formElement.querySelector(submitButtonSelector);
        hangEventListener(inputList, buttonElement, rest);
    })
}
function hangEventListener(inputList, buttonElement, rest) {
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input, rest.ErrorTypeSelector, rest.inputErrorClass, rest.errorClass);
            toggleButtonState(inputList, buttonElement, rest.inactiveButtonClass);
        })

    })
}

function checkInputValidity(input, ErrorTypeSelector, inputErrorClass, errorClass) {
    const errorElement = document.querySelector(`${ErrorTypeSelector}${input.name}`)
    if (!input.validity.valid) {
        showInputError(input, errorElement, inputErrorClass, errorClass);
    }
    else {
        hideInputError(input, errorElement, inputErrorClass, errorClass);
    }
}
function showInputError(input, errorElement, inputErrorClass, errorClass) {
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);

}

function hideInputError(input, errorElement, inputErrorClass, errorClass) {
    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}
function hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => {
        return !input.validity.valid;
    });

}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function resetErrorForm(form) {
    form.querySelectorAll(validationConfig.inputSelector).forEach((input) => {
        const errorText = document.querySelector(`${validationConfig.ErrorTypeSelector}${input.name}`)
        if (!input.validity.valid) {
            hideInputError(input, errorText, validationConfig.inputErrorClass, validationConfig.errorClass);
        }
    })


}