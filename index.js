const popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const buttonClosePopUpProfile = document.querySelector(".popup__close-icon");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(".popup__form");
const buttonSubmitProfile = document.querySelector(".popup__save");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputName = document.querySelector(".popup__text_type_name");
const inputLink = document.querySelector(".popup__text_type_about");

const openPopup = function () {
    popup.classList.add("popup_is-opened");
}

const closePopup = function () {
    popup.classList.remove("popup_is-opened");
}

function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputLink.value;
    closePopup();
}
buttonEditProfile.addEventListener("click", () => {
    inputName.value = profileTitle.textContent;
    inputLink.value = profileSubtitle.textContent;
    openPopup();
});

buttonClosePopUpProfile.addEventListener("click", closePopup);
formEditProfile.addEventListener("submit", handleFormSubmitProfile);

