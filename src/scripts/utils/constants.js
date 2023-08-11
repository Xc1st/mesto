const initialCards = [
    {
        title: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        title: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        title: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        title: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        title: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        title: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
const popupImageSelector = '.popup_type_image';
const cardElementsSelector = ".elements-container";
const popupProfileSelector = ".popup_type_profile";
const popupCardSelector = ".popup_type_card";
const configWithInfo = {
    nameSelector: ".profile__title",
    infoSelector: ".profile__subtitle"

}
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddProfile = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".popup__form-profile");
const formEditCard = document.querySelector(".popup__form-card");

export {
    initialCards,
    validationConfig,
    popupImageSelector,
    cardElementsSelector,
    popupProfileSelector,
    popupCardSelector,
    configWithInfo,
    buttonEditProfile,
    buttonAddProfile,
    formEditProfile,
    formEditCard,
}