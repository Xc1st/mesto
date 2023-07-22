import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './array.js';
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    // ErrorTypeSelector: '.popup__error_type_',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const allPopups = document.querySelectorAll('.popup');
const сardElements = document.querySelector(".elements-container");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypeCard = document.querySelector(".popup_type_card");
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const buttonClosePopUpProfile = document.querySelector(".popup__close-icon");
const buttonClosePopUpCard = popupTypeCard.querySelector(".popup__close-icon");
const buttonClosePopUpImg = popupTypeImg.querySelector(".popup__close-icon");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddProfile = document.querySelector(".profile__add-button");
const formEditProfile = document.querySelector(".popup__form-profile");
const formEditCard = document.querySelector(".popup__form-card");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__input_type_name");
const inputLink = document.querySelector(".popup__input_type_about");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputLinkImg = document.querySelector(".popup__input_type_url");

const cardValidation = new FormValidator(formEditCard, validationConfig);
cardValidation.enableValidation();
const profileValidation = new FormValidator(formEditProfile, validationConfig);
profileValidation.enableValidation();

function createCard(cardData) {
    const card = new Card(cardData, '#elements_template', openFotoPopUp)
    const cardElement = card.generateCard();
    return cardElement
}

function openFotoPopUp(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupTypeImg);
}

// создание нач. карточек
initialCards.forEach(element => {
    const cardElement = createCard(element);
    сardElements.append(cardElement);
});



const openPopup = function (popup) {
    document.addEventListener('keydown', closePopupEscape);
    popup.classList.add("popup_opened");
}

function openProfile() {
    openPopup(popupTypeProfile)
    inputName.value = profileTitle.textContent;
    inputLink.value = profileSubtitle.textContent;
}

function openCard() {
    openPopup(popupTypeCard)
}

const closePopup = function (popup) {
    document.removeEventListener('keydown', closePopupEscape);
    popup.classList.remove("popup_opened");

}

// закрытие Esc
function closePopupEscape(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

// закрытие по оверлею
function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputLink.value;
    closePopup(popupTypeProfile);
}

function handleFormSubmitCard(evt) {
    evt.preventDefault();
    сardElements.prepend(createCard({ name: inputTitle.value, link: inputLinkImg.value }))
    closePopup(popupTypeCard);

}

// editProfile //
buttonEditProfile.addEventListener("click", () => {
    profileValidation.resetValid();
    inputName.value = profileTitle.textContent;
    inputLink.value = profileSubtitle.textContent;
    openProfile();
})
buttonClosePopUpProfile.addEventListener("click", () => closePopup(popupTypeProfile));

formEditProfile.addEventListener("submit", handleFormSubmitProfile);


// card //
buttonAddProfile.addEventListener("click", () => {
    formEditCard.reset();
    cardValidation.resetValid();
    openCard();
})

buttonClosePopUpCard.addEventListener("click", () => closePopup(popupTypeCard));
formEditCard.addEventListener("submit", handleFormSubmitCard);

// image //

buttonClosePopUpImg.addEventListener("click", () => closePopup(popupTypeImg));

allPopups.forEach(element => element.addEventListener('click', closePopupOverlay));