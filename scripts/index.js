const popup = document.querySelector(".popup");
const allPopups = document.querySelectorAll('.popup');
const сardElements = document.querySelector(".elements-container");
const elementsTemplate = document.querySelector("#elements_template").content;
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
// сброс //
const popupSaveProfile = formEditProfile.querySelector(".popup__save");
const popupInputListProfile = formEditProfile.querySelectorAll(".popup__input");
const popupSaveCard = formEditCard.querySelector(".popup__save")
const popupInputListCard = formEditCard.querySelectorAll(".popup__input");


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function createCard({ name, link }) {
    const newCard = elementsTemplate.querySelector(".element").cloneNode(true);
    const fotoElement = newCard.querySelector(".element__foto");
    fotoElement.src = link;
    fotoElement.alt = name;
    newCard.querySelector(".element__subtitle").textContent = name;

    newCard.querySelector(".element__button-like").addEventListener('click', function (evt) { evt.target.classList.toggle("element__button-like_active"); })

    newCard.querySelector(".element__button-delete").addEventListener('click', () => {
        newCard.remove();
    })

    fotoElement.addEventListener('click', () => {
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        openPopup(popupTypeImg);
    })

    return newCard;

}

initialCards.forEach((item) => сardElements.append(createCard(item)));



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
    resetErrorForm(formEditProfile)
    inputName.value = profileTitle.textContent;
    inputLink.value = profileSubtitle.textContent;
    toggleButtonState(popupInputListProfile, popupSaveProfile, validationConfig.inactiveButtonClass);
    openProfile();
})
buttonClosePopUpProfile.addEventListener("click", () => closePopup(popupTypeProfile));

formEditProfile.addEventListener("submit", handleFormSubmitProfile);


// card //
buttonAddProfile.addEventListener("click", () => {
    formEditCard.reset();
    resetErrorForm(formEditCard);
    toggleButtonState(popupInputListCard, popupSaveCard, validationConfig.inactiveButtonClass);
    openCard();
})

buttonClosePopUpCard.addEventListener("click", () => closePopup(popupTypeCard));
formEditCard.addEventListener("submit", handleFormSubmitCard);

// image //

buttonClosePopUpImg.addEventListener("click", () => closePopup(popupTypeImg));

allPopups.forEach(element => element.addEventListener('click', closePopupOverlay));