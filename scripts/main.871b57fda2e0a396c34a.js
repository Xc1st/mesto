(()=>{"use strict";class e{constructor(e,t,s,i,n){this._myId=e.myid,this._ownerId=e.owner._id,this._likes=e.likes,this._likesLength=e.likes.length,this._link=e.link,this._name=e.name,this._cardId=e._id,this._openFotoPopUp=s,this._openDeletePopup=i,this._numberLike=n,this._getTemplate=document.querySelector(t).content.querySelector(".element").cloneNode(!0),this._elementTrash=this._getTemplate.querySelector(".element__button-delete"),this._elementFoto=this._getTemplate.querySelector(".element__foto"),this._elementLike=this._getTemplate.querySelector(".element__button-like"),this._elementSubtitle=this._getTemplate.querySelector(".element__subtitle"),this._counter=this._getTemplate.querySelector(".element__like-number")}generateCard(){return this._elementFoto.src=this._link,this._elementFoto.alt=this._name,this._elementSubtitle.textContent=this._name,this._checkLike(),this._visibleTrash(),this._setEventListeners(),this._getTemplate}_handleOpenFotoPopUp=()=>{this._openFotoPopUp(this._name,this._link)};_handleRemoveTrash=()=>{this._openDeletePopup({card:this,cardId:this._cardId})};_handleElementLike=()=>{this._numberLike(this._elementLike,this._cardId)};_visibleTrash(){this._myId===this._ownerId?this._elementTrash.style.display="block":this._elementTrash.style.display="none"}_checkLike(){this._likes.forEach((e=>{e._id!==this._myId||this._elementLike.classList.add("element__button-like_active")})),this._counter.textContent=this._likesLength}isLike(e){this._elementLike.classList.toggle("element__button-like_active"),this._counter.textContent=e.length}removeCard(){this._getTemplate.remove()}_setEventListeners(){this._elementFoto.addEventListener("click",this._handleOpenFotoPopUp),this._elementTrash.addEventListener("click",this._handleRemoveTrash),this._elementLike.addEventListener("click",this._handleElementLike)}}class t{constructor(e,t){this._formElement=e,this._validationConfig=t,this._inputList=Array.from(e.querySelectorAll(this._validationConfig.inputSelector)),this._buttonSave=this._formElement.querySelector(this._validationConfig.submitButtonSelector)}_showInputError=(e,t)=>{const s=this._formElement.querySelector(`.${e.id}-error`);e.classList.add(this._validationConfig.inputErrorClass),s.textContent=t,s.classList.add(this._validationConfig.errorClass)};_hideInputError=e=>{const t=this._formElement.querySelector(`.${e.id}-error`);e.classList.remove(this._validationConfig.inputErrorClass),t.classList.remove(this._validationConfig.errorClass),t.textContent=""};_checkInputValidity=e=>{e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)};_hasInvalidInput=()=>this._inputList.some((e=>!e.validity.valid));_toggleButtonState=()=>{this._hasInvalidInput()?(this._buttonSave.classList.add(this._validationConfig.inactiveButtonClass),this._buttonSave.setAttribute("disabled",!0)):(this._buttonSave.classList.remove(this._validationConfig.inactiveButtonClass),this._buttonSave.removeAttribute("disabled"))};_setEventListeners=()=>{this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))};resetValid=()=>{this._toggleButtonState(),this._inputList.forEach((e=>{this._hideInputError(e)}))};enableValidation=()=>{this._setEventListeners()}}class s{constructor(e){this._popup=document.querySelector(e),this._closePopupEscape=this._popup.querySelector(".popup__close-icon"),this._form=this._popup.querySelector(".popup__form")}_handleEscClose=e=>{"Escape"===e.key&&this.close(e)};_hadleCloseButton=()=>{this.close()};_hadleClickByOverlay=e=>{e.target===e.currentTarget&&this.close()};setEventListeners(){this._closePopupEscape.addEventListener("click",this._hadleCloseButton),this._popup.addEventListener("click",this._hadleClickByOverlay)}open(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}}class i extends s{constructor(e,t){super(e),this._handleSubmit=t,this._form=this._popup.querySelector(".popup__form"),this._inputList=this._form.querySelectorAll(".popup__input"),this._buttonSubmit=this._form.querySelector(".popup__save"),this._defaultText=this._buttonSubmit.textContent}_getInputsValue(){return this._values={},this._inputList.forEach((e=>{this._values[e.name]=e.value})),this._values}setInputsValue(e){this._inputList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._buttonSubmit.textContent=`${this._buttonSubmit.textContent}...`,this._handleSubmit(this._getInputsValue())}))}DefaultText(){this._buttonSubmit.textContent=this._defaultText}close(){super.close(),this._form.reset()}}const n={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__save",inactiveButtonClass:"popup__save_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},o=document.querySelector(".profile__edit-button"),r=document.querySelector(".profile__add-button"),a=document.querySelector(".popup__form-profile"),l=document.querySelector(".popup__form-card"),h=document.querySelector(".popup__form-avatar"),_=document.querySelector(".profile__avatar-overlay"),u=new class{constructor(e){this._url=e.baseUrl,this._headers=e.headers,this._authorization=e.headers.authorization}_checkRes(e){return e.ok?e.json():Promise.reject}getInfo(){return fetch(`${this._url}/users/me`,{headers:{authorization:this._authorization}}).then(this._checkRes)}getCards(){return fetch(`${this._url}/cards`,{headers:{authorization:this._authorization}}).then(this._checkRes)}setUserInfo(e){return fetch(`${this._url}/users/me`,{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})}).then(this._checkRes)}setAvatar(e){return fetch(`${this._url}/users/me/avatar`,{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e.avatar})}).then(this._checkRes)}addNewCard(e){return fetch(`${this._url}/cards`,{method:"POST",headers:this._headers,body:JSON.stringify({name:e.title,link:e.link})}).then(this._checkRes)}addLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"PUT",headers:{authorization:this._authorization}}).then(this._checkRes)}deleteLike(e){return fetch(`${this._url}/cards/${e}/likes`,{method:"DELETE",headers:{authorization:this._authorization}}).then(this._checkRes)}deleteCard(e){return fetch(`${this._url}/cards/${e}`,{method:"DELETE",headers:{authorization:this._authorization}}).then(this._checkRes)}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-73",headers:{authorization:"ea301b08-8025-4479-9d91-cbfea0d2701e","Content-Type":"application/json"}}),c=new class{constructor(e){this._nameElement=document.querySelector(e.nameSelector),this._infoElement=document.querySelector(e.infoSelector),this._profileAvatar=document.querySelector(e.profileAvatar)}getUserInfo(){return{name:this._nameElement.textContent,about:this._infoElement.textContent}}setUserInfo({name:e,about:t,avatar:s}){this._nameElement.textContent=e,this._infoElement.textContent=t,this._profileAvatar.src=s}}({nameSelector:".profile__title",infoSelector:".profile__subtitle",profileAvatar:".profile__avatar"}),p=new t(l,n);p.enableValidation();const d=new t(a,n);d.enableValidation();const m=new t(h,n);m.enableValidation();const v=new class extends s{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._popupCaption=this._popup.querySelector(".popup__caption")}open=(e,t)=>{this._popupImage.src=t,this._popupImage.alt=e,this._popupCaption.textContent=e,super.open()}}(".popup_type_image"),f=new class extends s{constructor(e,t){super(e),this._handleSubmit=t,this._buttonSubmit=this._form.querySelector(".popup__save"),this._defaultText=this._buttonSubmit.textContent}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._buttonSubmit.textContent=`${this._buttonSubmit.textContent}...`,this._handleSubmit({card:this._element,cardId:this._cardId})}))}DefaultText(){this._buttonSubmit.textContent=this._defaultText}open=({card:e,cardId:t})=>{super.open(),this._element=e,this._cardId=t}}(".popup_type_delete",(({card:e,cardId:t})=>{u.deleteCard(t).then((()=>{e.removeCard(),f.close()})).catch((e=>console.error(`Ошибка при удалении карточки ${e}`))).finally((()=>{f.DefaultText()}))}));function b(t){const s=new e(t,"#elements_template",v.open,f.open,((e,t)=>{e.classList.contains("element__button-like_active")?u.deleteLike(t).then((e=>{s.isLike(e.likes)})).catch((e=>console.error(`Ошибка при снятии лайка ${e}`))):u.addLike(t).then((e=>{s.isLike(e.likes)})).catch((e=>console.error(`Ошибка при добавлении лайка ${e}`)))}));return s.generateCard()}const y=new class{constructor(e,t){this._container=document.querySelector(t),this._renderer=e}addCard(e){e.forEach((e=>{this._renderer(e)}))}addItemPrepend(e){this._container.prepend(e)}addItemAppend(e){this._container.append(e)}}((e=>{y.addItemAppend(b(e))}),".elements-container"),S=new i(".popup_type_profile",(e=>{u.setUserInfo(e).then((e=>{c.setUserInfo({name:e.name,about:e.about,avatar:e.avatar}),S.close()})).catch((e=>console.error(`Ошибка при редактировании профиля ${e}`))).finally((()=>{S.DefaultText()}))})),k=new i(".popup_type_card",(e=>{Promise.all([u.getInfo(),u.addNewCard(e)]).then((([e,t])=>{t.myid=e._id,y.addItemPrepend(b(t)),k.close()})).catch((e=>console.error(`Ошибка при создании карточки ${e}`))).finally((()=>{k.DefaultText()}))})),L=new i(".popup_type_avatar",(e=>{u.setAvatar(e).then((e=>{c.setUserInfo({name:e.name,about:e.about,avatar:e.avatar}),L.close()})).catch((e=>console.error(`Ошибка при редактировании автара ${e}`))).finally((()=>{L.DefaultText()}))}));v.setEventListeners(),S.setEventListeners(),k.setEventListeners(),L.setEventListeners(),f.setEventListeners(),o.addEventListener("click",(()=>{S.setInputsValue(c.getUserInfo()),d.resetValid(),S.open()})),r.addEventListener("click",(()=>{p.resetValid(),k.open()})),_.addEventListener("click",(()=>{m.resetValid(),L.open()})),Promise.all([u.getInfo(),u.getCards()]).then((([e,t])=>{t.forEach((t=>t.myid=e._id)),c.setUserInfo({name:e.name,about:e.about,avatar:e.avatar}),y.addCard(t)})).catch((e=>console.error(`Ошибка при создании начальных данных ${e}`)))})();