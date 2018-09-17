import Item from './item.js';


export default class Store {
  constructor() {
    this.Item = Item;
    this.list = [];

    this.getListFromLocalStorage();
  }

  getListFromLocalStorage() {
    const list = localStorage.getItem(`toDoTaskList`);
    if (list) {
      this.list = JSON.parse(list);
    }
  }

  writeListInLocalStorage() {
    localStorage.setItem(`toDoTaskList`, JSON.stringify(this.list));
  }

  deleteItem() {
    const deleteItemNumber = [];
    const newList = this.list.filter((item, i) => {
      if (!item.state) {
        return true;
      } else {
        deleteItemNumber.push(i);
      }
    });

    this.list = newList;
    this.writeListInLocalStorage();
    return deleteItemNumber;
  }

  addItem(text) {
    this.list.push(new this.Item(text));
    this.writeListInLocalStorage();
    return [this.list[this.list.length - 1], this.list.length - 1];
  }

  changeItemStatus(number, isComplete) {
    this.list[number].state = isComplete;
    this.writeListInLocalStorage();
  }

}
