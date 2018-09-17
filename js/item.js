export default class Item {
  constructor(task, state = false) {
    this.task = task;
    this.state = state;
  }
}
