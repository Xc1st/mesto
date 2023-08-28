export default class Card {
    constructor(cardData, selectorTemplate, openFotoPopUp, openDeletePopup, numberLike) {
        this._myId = cardData.myid;
        this._ownerId = cardData.owner._id;
        this._likes = cardData.likes;
        this._likesLength = cardData.likes.length;
        this._link = cardData.link;
        this._name = cardData.name;
        this._cardId = cardData._id;
        this._openFotoPopUp = openFotoPopUp;
        this._openDeletePopup = openDeletePopup;
        this._numberLike = numberLike;
        this._getTemplate = document.querySelector(selectorTemplate).content.querySelector('.element').cloneNode(true);
        this._elementTrash = this._getTemplate.querySelector('.element__button-delete');
        this._elementFoto = this._getTemplate.querySelector('.element__foto');
        this._elementLike = this._getTemplate.querySelector('.element__button-like');
        this._elementSubtitle = this._getTemplate.querySelector('.element__subtitle')
        this._counter = this._getTemplate.querySelector('.element__like-number');
    }

    generateCard() {
        this._elementFoto.src = this._link;
        this._elementFoto.alt = this._name;
        this._elementSubtitle.textContent = this._name;
        this._checkLike();
        this._visibleTrash();
        this._setEventListeners();
        return this._getTemplate
    }

    _handleOpenFotoPopUp = () => {
        this._openFotoPopUp(this._name, this._link);
    }
    _handleRemoveTrash = () => {
        this._openDeletePopup({ card: this, cardId: this._cardId })
    }
    _handleElementLike = () => {
        this._numberLike(this._elementLike, this._cardId)
    }
    _visibleTrash() {
        this._myId === this._ownerId ? this._elementTrash.style.display = 'block' : this._elementTrash.style.display = 'none';
    }
    _checkLike() {
        this._likes.forEach(item => {
            if (item._id === this._myId) {
                this._elementLike.classList.add('element__button-like_active');
                return
            }
        });
        this._counter.textContent = this._likesLength
        
    }

    isLike(likes) {
        this._elementLike.classList.toggle('element__button-like_active');
        this._counter.textContent = likes.length
    }

    removeCard() {
        this._getTemplate.remove();
    }
    _setEventListeners() {
        this._elementFoto.addEventListener('click', this._handleOpenFotoPopUp);
        this._elementTrash.addEventListener('click', this._handleRemoveTrash);
        this._elementLike.addEventListener('click', this._handleElementLike);
    }
}