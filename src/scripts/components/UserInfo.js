export default class UserInfo {
    constructor(configWithInfo) {
        this._nameElement = document.querySelector(configWithInfo.nameSelector);
        this._infoElement = document.querySelector(configWithInfo.infoSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._infoElement.textContent
        }
    }

    setUserInfo({name, about}) {
        this._nameElement.textContent = name;
        this._infoElement.textContent = about;
    }
}