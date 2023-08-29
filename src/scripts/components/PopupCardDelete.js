import Popup from "./Popup";

export default class PopupCardDelete extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._defaultText = this._buttonSubmit.textContent;


    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`
            this._handleSubmit({ card: this._element, cardId: this._cardId });
        })
    }
    defaultText() { 
        this._buttonSubmit.textContent = this._defaultText;
    }
    open = ({ card, cardId }) => {
        super.open();
        this._element = card;
        this._cardId = cardId;

    }
}