import showScreen from './showScreen.js';

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

  getElementTemplate(element, number) {

      return `<li class="tasks__item" data-number="${number}">
            <input class="tasks__checkbox visually-hidden" id="${number}" type="checkbox" ${element.state ? `checked` : ``}>
            <label class="tasks__label" for="${number}"></label>
            <label class="tasks__text" for="${number}">${element.task}</label>
        </li>`
  }

  getListTemplate(list) {
    return list.map( (element, i) => {
                return this.getElementTemplate(element, i);
            }).join(``);
  }

  createElement(html) {
    const template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content;
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
    const element = this.createElement(this.getListTemplate(list));
    showScreen(element);
  }

  addItem(item) {
    const element = this.createElement(this.getElementTemplate(...item));
    showScreen(element, false);
    this.userInput.value = ``;
    this.userInput.blur();
  }

  deleteItem(item) {
    /*
    анимация удаления
    затем либо рендерим весь лист либо удаляем элементы те что надо отдельно
    */

  }

  onInputEnter(evt) {

  }

  onListClick(evt) {

  }

  onControlsClick(evt) {


  }

  onHashChange(sortType) {

  }

  changeFooterView(evt) {
    this.footer.classList.toggle(`page-footer--close`);
  }

}
