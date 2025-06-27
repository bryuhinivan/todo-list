export class TaskModel {
  constructor(initialValue = []) {
    this.tasks = initialValue;
  }

  setTasks = (newTasks) => {
    this.tasks = newTasks;
  };
  getTasks = () => {
    return this.tasks;
  };

  getActiveTasks = () => {
    return this.tasks.filter((task) => !task.done);
  };

  getDoneTasks = () => {
    return this.tasks.filter((task) => task.done);
  };

  addTask = (newTask) => {
    this.tasks.push(newTask);
  };

  deleteTask = (id) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };

  toggleTask = (id) => {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
      return true;
    }
  };
}
