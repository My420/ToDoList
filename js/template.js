const template = {

  _chooseElementVisibility: function (element, sortType) {
    if (sortType === `#active` && element.state === true) {
      return `visually-hidden`;
    } else if (sortType === `#completed` && element.state === false) {
      return `visually-hidden`;
    } else {
      return ``;
    }
  },

  getElementTemplate: function (element, number, sortType) {

    return `<li class="tasks__item ${this._chooseElementVisibility(element, sortType)}" data-number="${number}">
            <input class="tasks__checkbox visually-hidden" id="${number}" type="checkbox" ${element.state ? `checked` : ``}>
            <label class="tasks__label" for="${number}"></label>
            <label class="tasks__text" for="${number}">${element.task}</label>
        </li>`;
  },

  getListTemplate: function (list, sortType) {
    return list.map((element, i) => {
      return this.getElementTemplate(element, i, sortType);
    }).join(``);
  },

  createElement: function (html) {
    const template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content;
  }
};

export default template;
