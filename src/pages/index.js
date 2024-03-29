import '../pages/index.css'
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupCardDelete from '../scripts/components/PopupCardDelete';
import Api from '../scripts/components/Api';
import {
    initialCards,
    validationConfig,
    popupImageSelector,
    cardElementsSelector,
    popupProfileSelector,
    popupCardSelector,
    popupAvatarSelector,
    popupDeleteSelector,
    configWithInfo,
    buttonEditProfile,
    buttonAddProfile,
    formEditProfile,
    formEditCard,
    formAvatar,
    profileAvatarOverlay,
} from '../scripts/utils/constants.js';

let userId

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
        authorization: 'ea301b08-8025-4479-9d91-cbfea0d2701e',
        'Content-Type': 'application/json'
    }
});



const userInfo = new UserInfo(configWithInfo);

const cardValidation = new FormValidator(formEditCard, validationConfig);
cardValidation.enableValidation();

const profileValidation = new FormValidator(formEditProfile, validationConfig);
profileValidation.enableValidation();

const avatarValidation = new FormValidator(formAvatar, validationConfig);
avatarValidation.enableValidation();

const popupCardImage = new PopupWithImage(popupImageSelector);

const deleteCardPopup = new PopupCardDelete(popupDeleteSelector, ({ card, cardId }) => {
    api.deleteCard(cardId)
        .then(() => {
            card.removeCard()
            deleteCardPopup.close();
        })
        .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
        .finally(()=>{
            deleteCardPopup.defaultText();
        })
});

function createCard(cardData) {
    const card = new Card(cardData, '#elements_template', popupCardImage.open, deleteCardPopup.open, (isLiked, cardId) => {
        if (isLiked) {
            api.deleteLike(cardId)
                .then(res => {
                    card.updateLikes(res.likes)
                })
                .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
        } else {
            api.addLike(cardId)
                .then(res => {
                    card.updateLikes(res.likes)
                })
                .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
        }
    })
    return card.generateCard();

}

const section = new Section((element) => {
    section.addItemAppend(createCard(element))
}, cardElementsSelector)


const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
    api.setUserInfo(data)
        .then(res => {
            userInfo.setUserInfo(res)
            popupProfile.close();
        })

        .catch((error => console.error(`Ошибка при редактировании профиля ${error}`)))
        .finally(()=>{
            popupProfile.defaultText();
        });
})

const popupCard = new PopupWithForm(popupCardSelector, (data) => {
    api.addNewCard(data)
        .then((dataCard) => {
            dataCard.myid = userInfo.getId();
            section.addItemPrepend(createCard(dataCard))
            popupCard.close()
        })
        .catch((error => console.error(`Ошибка при создании карточки ${error}`)))
        .finally(()=>{
            popupCard.defaultText();
        });
});

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
    api.setAvatar(data)
        .then(res => {
            userInfo.setUserInfo(res)
            popupAvatar.close();
        })
        .catch((error => console.error(`Ошибка при редактировании автара ${error}`)))
        .finally(() => {
            popupAvatar.defaultText();

        });
})



popupCardImage.setEventListeners();
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupAvatar.setEventListeners();
deleteCardPopup.setEventListeners();


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

profileAvatarOverlay.addEventListener("click", () => {
    avatarValidation.resetValid();
    popupAvatar.open();
})

Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
        dataCards.forEach(element => element.myid = dataUser._id)
        userInfo.setUserInfo({
            name: dataUser.name,
            about: dataUser.about,
            avatar: dataUser.avatar
        })
        userInfo.setId(dataUser._id);
        section.renderItems(dataCards);
    })
    .catch((error) => console.error(`Ошибка при создании начальных данных ${error}`))