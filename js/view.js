import showScreen from './showScreen.js';
import template from './template.js';

export default class ListView {

  constructor() {
    this.appList = document.querySelector(`.tasks__list`);
    this.userInput = document.querySelector(`.input__field`);
    this.controls = document.querySelector(`.controls`);
    this.footerOpenBatton = document.querySelector(`.page-header__button`);
    this.footerCloseBatton = document.querySelector(`.page-footer__button`);
    this.footer = document.querySelector(`.page-footer`);
    this._sortType = `all`;
    this.bind();
  }

  bind() {
    this.userInput.addEventListener(`keydown`, (evt) => {this.onInputEnter(evt)});
    this.appList.addEventListener(`click`, (evt) => {this.onListClick(evt)});
    this.controls.addEventListener(`click`, (evt) => {this.onControlsClick(evt)});
    this.footerOpenBatton.addEventListener(`click`, (evt) => {this.changeFooterView(evt)});
    this.footerCloseBatton.addEventListener(`click`, (evt) => {this.changeFooterView(evt)});
    location.hash = `all`;
    window.onhashchange = () => {this.onHashChange(this.sortType)};
  }

  set sortType(type) {
    this._sortType = type;
  }

  get sortType() {
    return this._sortType;
  }

  render(list) {
    const element = template.createElement(template.getListTemplate(list));
    showScreen(element);
  }

  addItem(item) {
    const element = template.createElement(template.getElementTemplate(...item));
    showScreen(element, false);
    /*this.userInput.value = ``;*/
    /*this.userInput.blur();*/
  }

  deleteItem(item) {

    if (item.length === 0 /*|| this.sortType === `active`*/) {
      return new Promise((resolve, reject)=>{ return resolve(`deleted from page`)});
    } else {

        let promise = new Promise((resolve, reject) => {

          const deletedElements = item.map((elem) => {
            return document.querySelector(`li[data-number='${elem}']`);
          });

          deletedElements.forEach((elem) => {
            elem.classList.add(`animation-deleted`);
          });

          setTimeout(() => {
              resolve(`deleted from page`);
          }, 2000);

        });

      return promise;
    }
  }

  changeFooterView(evt) {
    this.footer.classList.toggle(`page-footer--close`);
  }

  onInputEnter(evt) {

  }

  onListClick(evt) {

  }

  onControlsClick(evt) {


  }

  onHashChange(sortType) {

  }

}
