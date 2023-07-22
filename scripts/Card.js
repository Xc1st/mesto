export default class Card {
    constructor(cardData, selectorTemplate, openFotoPopUp) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._selectorTemplate = selectorTemplate;
        this._openFotoPopUp = openFotoPopUp;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
        return cardElement
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementTrash = this._element.querySelector('.element__button-delete');
        this._elementFoto = this._element.querySelector('.element__foto');
        this._elementLike = this._element.querySelector('.element__button-like');
        this._elementSubtitle = this._element.querySelector('.element__subtitle')
        this._elementFoto.src = this._link;
        this._elementFoto.alt = this._name;
        this._elementSubtitle.textContent = this._name;
        this._setEventListeners();
        return this._element
    }
    _setEventListeners() {
        this._elementFoto.addEventListener('click', () => {
            this._openFotoPopUp(this._name, this._link);
        });
        this._elementTrash.addEventListener('click', () => {
            this._element.remove();
        });
        this._elementLike.addEventListener('click', () => {
            this._elementLike.classList.toggle('element__button-like_active');
        });
    }
}