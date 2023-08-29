export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupEscape = this._popup.querySelector('.popup__close-icon');
        this._buttonSubmit = this._popup.querySelector(".popup__save"); 
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close(evt);
        }
    }

    _hadleCloseButton = () => {
        this.close();
    }
    
    _hadleClickByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._closePopupEscape.addEventListener('click', this._hadleCloseButton);
        this._popup.addEventListener('click', this._hadleClickByOverlay);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}