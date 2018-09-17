const template = {

  getElementTemplate: function (element, number) {

      return `<li class="tasks__item" data-number="${number}">
            <input class="tasks__checkbox visually-hidden" id="${number}" type="checkbox" ${element.state ? `checked` : ``}>
            <label class="tasks__label" for="${number}"></label>
            <label class="tasks__text" for="${number}">${element.task}</label>
        </li>`
  },

  getListTemplate: function (list) {
    return list.map( (element, i) => {
                return this.getElementTemplate(element, i);
            }).join(``);
  },

  createElement(html) {
    const template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content;
  }

}

export default template;
