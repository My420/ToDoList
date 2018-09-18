import Store from './store.js';
import ListView from './view.js';

export default class Controller {
  constructor() {
    this.model = new Store();
    this.view = new ListView();
  }

  init() {
    location.hash = `all`;
    window.onhashchange = () => {this.onHashChange(location.hash)};

    this.view.render(this.model.list, location.hash);
    this.view.onInputEnter = this.onInputEnter.bind(this);
    this.view.onListClick = this.onListClick.bind(this);
    this.view.onControlsClick = this.onControlsClick.bind(this);
    this.view.onHashChange = this.onHashChange.bind(this);
  }

  onInputEnter(evt) {
    if(evt.keyCode === 13 && evt.target.value !== ``) {
      const task = evt.target.value;
      const newItem = this.model.addItem(task);
      this.view.addItem(newItem, location.hash);
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

        evt.target.disabled = true;

        this.view.deleteItem(this.model.deleteItem()).then( () => {
          this.view.render(this.model.list, location.hash);
          evt.target.disabled = false;
        }).catch( (error) => {
          this.view.render(this.model.list, location.hash);
          evt.target.disabled = false;
        });


      } else {
        const prevHash = location.hash.slice(1);
        location.hash = action;
        this._changeActiveSortButton(prevHash, evt.target);
      }
    }
  }

  _changeActiveSortButton(prevHash, newSortButton) {

    const prevSortButton = document.querySelector(`button[data-action=${prevHash}]`);

    prevSortButton.classList.remove(`controls__button--active`);
    newSortButton.classList.add(`controls__button--active`);
  }


  onHashChange(sortType) {

   this.view.render(this.model.list, location.hash);

  }

}
