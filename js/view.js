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
    this.bind();
  }

  bind() {
    this.userInput.addEventListener(`keydown`, (evt) => {this.onInputEnter(evt)});
    this.appList.addEventListener(`click`, (evt) => {this.onListClick(evt)});
    this.controls.addEventListener(`click`, (evt) => {this.onControlsClick(evt)});
    this.footerOpenBatton.addEventListener(`click`, (evt) => {this.changeFooterView(evt)});
    this.footerCloseBatton.addEventListener(`click`, (evt) => {this.changeFooterView(evt)});
  }

  render(list, sortType) {
    const element = template.createElement(template.getListTemplate(list, sortType));
    showScreen(element);
  }

  addItem(item, sortType) {
    const element = template.createElement(template.getElementTemplate(...item, sortType));
    element.querySelector(`li`).classList.add(`animation-add`);
    showScreen(element, false);
    setTimeout(() => {
      document.querySelector(`li[data-number='${item[1]}']`).classList.remove(`animation-add`);
    }, 1000);

    this.userInput.value = ``;
    this.userInput.blur();
  }

  deleteItem(item) {

    if (item.length === 0) {
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
