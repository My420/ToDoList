import Store from './store.js';
import ListView from './view.js';

export default class Controller {
  constructor() {
    this.model = new Store();
    this.view = new ListView();
  }

  init() {
    this.view.render(this.model.list);
    this.view.onInputEnter = this.onInputEnter.bind(this);
    this.view.onListClick = this.onListClick.bind(this);
    this.view.onControlsClick = this.onControlsClick.bind(this);
    this.view.onHashChange = this.onHashChange.bind(this);
  }

  onInputEnter(evt) {
    if(evt.keyCode === 13 && evt.target.value !== ``) {
      const task = evt.target.value;
      const newItem = this.model.addItem(task);
      this.view.addItem(newItem);
    }
  }

  onListClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      const number = +evt.target.id;
      const isChecked = evt.target.checked;
      this.model.changeItemStatus(number, isChecked);
    }
  }

  onControlsClick(evt) {
    if(evt.target.tagName === `BUTTON`) {

      const action = evt.target.dataset.action;

      if(action === `delete`) {

        this.view.deleteItem(this.model.deleteItem()).then( () => {
          this.view.render(this._sortTaskList(this.view.sortType));
        }).catch( (error) => {
          this.view.render(this._sortTaskList(this.view.sortType));
        });

      } else {
        location.hash = action;
      }
    }
  }

  _sortTaskList(type) {
    if (type === `complited`) {
      return this.model.list.filter((elem) => {return elem.state});
    } else if (type === `active`) {
      return this.model.list.filter((elem) => {return !elem.state});
    } else {
      return this.model.list;
    }
  }

  onHashChange(prevSortType) {
    const prevSortButton = document.querySelector(`button[data-action=${prevSortType}]`);
    const newSortButton = document.querySelector(`button[data-action=${location.hash.slice(1)}]`);

    this.view.sortType = location.hash.slice(1);

    const sortedList = this._sortTaskList(this.view.sortType);

    this.view.render(sortedList);

    prevSortButton.classList.remove(`controls__button--active`);
    newSortButton.classList.add(`controls__button--active`);

  }

}
