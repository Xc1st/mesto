import '../pages/index.css'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import {
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
} from '../scripts/utils/constants.js';


const userInfo = new UserInfo(configWithInfo);

const cardValidation = new FormValidator(formEditCard, validationConfig);
cardValidation.enableValidation();

const profileValidation = new FormValidator(formEditProfile, validationConfig);
profileValidation.enableValidation();

const popupCardImage = new PopupWithImage(popupImageSelector);

const section = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = new Card(cardData, '#elements_template', popupCardImage.open)
        return card.generateCard();

    },
}, cardElementsSelector)
section.addCard();

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    userInfo.setUserInfo(data)
})

const popupCard = new PopupWithForm(popupCardSelector, (data) => {
    section.addItem(data);
});

popupCardImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();

// editProfile //
buttonEditProfile.addEventListener("click", () => {
    popupProfile.setInputsValue(userInfo.getUserInfo());
    profileValidation.resetValid();
    popupProfile.open();
})
// card //
buttonAddProfile.addEventListener("click", () => {
    cardValidation.resetValid();
    popupCard.open();
})

