import "../scss/style.scss";
import { doneIcon, deleteIcon } from "./icons.js";
import { httpClient } from "./httpClient.js";

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const completedTasks = document.querySelector(".completed-tasks");
// const tasksTitle = document.querySelector("#tasksTitle");
// const API = "https://2966e7f6fec89ed2.mokky.dev/todo";

let tasks = [];

document.addEventListener("DOMContentLoaded", getTasksFromServer);
form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);
completedTasks.addEventListener("click", returnTask);

async function getTasksFromServer() {
  try {
    const tasksFromServer = await httpClient.get("todo");

    // Очищаем оба списка задач
    tasksList.innerHTML = "";
    completedTasks.innerHTML = "";

    // Обновляем массив задач
    tasks = tasksFromServer;

    // Разделяем задачи на активные и выполненные
    const activeTasks = tasks.filter((task) => !task.done);
    const doneTasks = tasks.filter((task) => task.done);

    // Отображаем активные задачи
    activeTasks.forEach((task) => {
      const taskHTML = `
        <li id="${task.id}" class="list-group-item">
          <span class="task-title">${task.text}</span>
          <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-item btn-item-checkmark btn-action">
              ${doneIcon}
            </button>
            <button type="button" data-action="delete" class="btn-item btn-item-garbage btn-action">
              ${deleteIcon}
            </button>
          </div>
        </li>
      `;
      tasksList.insertAdjacentHTML("beforeend", taskHTML);
    });

    // Отображаем выполненные задачи
    doneTasks.forEach((task) => {
      const doneTaskHTML = `<li id="${task.id}"class="list-group-item">
        <span class="task-title task-title--done">${task.text}</span>
        <div class="task-item__buttons">
          <button type="button" data-action="return" class="btn-item btn-item-backarrow btn-action">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9e78cf">
              <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/>
            </svg>
          </button>
        </div>
      </li>
        `;
      completedTasks.insertAdjacentHTML("beforeend", doneTaskHTML);
    });

    updateTitlesVisibility();
  } catch (error) {
    console.log(error);
  }
}

async function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  try {
    const newTask = await httpClient.post("todo", {
      text: taskText,
      done: false,
    });

    tasks.push(newTask);

    // Формируем CSS класс
    const cssClass = newTask.done
      ? "task-title task-title--done"
      : "task-title";

    // Отрисовываем задачу
    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item">
      <span class="${cssClass}">${newTask.text}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-item btn-item-checkmark btn-action">
          ${doneIcon}
        </button>
        <button type="button" data-action="delete" class="btn-item btn-item-garbage btn-action">
          ${deleteIcon}
        </button>
      </div>
    </li>
  `;

    tasksList.insertAdjacentHTML("beforeend", taskHTML);

    taskInput.value = "";
    taskInput.focus();
    updateTitlesVisibility();
  } catch (error) {
    console.log(error);
  }
}

async function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    const id = +parentNode.id;

    try {
      // Удаляем задачу на сервере
      await httpClient.delete("todo", id);

      tasks = tasks.filter((task) => task.id !== id);
      parentNode.remove();
      updateTitlesVisibility();
    } catch (error) {
      console.log(error);
    }
  }
}

async function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const id = +parentNode.id;
    const task = tasks.find((task) => task.id === id);

    try {
      // Обновляем задачу на сервере
      await httpClient.patch("todo", { done: true }, id);

      task.done = true;
      const taskTitle = parentNode.querySelector(".task-title");
      const taskText = taskTitle.textContent;

      const doneTaskHTML = `
          <li id="${id}" class="list-group-item">
            <span class="task-title task-title--done">${taskText}</span>
            <div class="task-item__buttons">
              <button type="button" data-action="return" class="btn-item btn-item-backarrow btn-action">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#9e78cf">
                  <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z"/>
                </svg>
              </button>
            </div>
          </li>
        `;

      const allTaskLists = document.querySelectorAll("ul.list-group");
      const doneTasksList = allTaskLists[1];

      doneTasksList.insertAdjacentHTML("beforeend", doneTaskHTML);
      parentNode.remove();

      updateTitlesVisibility();
    } catch (error) {
      console.log(error);
    }
  }
}

async function returnTask(event) {
  if (event.target.dataset.action === "return") {
    const taskItem = event.target.closest(".list-group-item");
    const taskText = taskItem.querySelector(".task-title").textContent;
    const id = +taskItem.id;

    try {
      await httpClient.patch("todo", { done: false }, id);

      const task = tasks.find((task) => task.id === id);
      if (task) {
        task.done = false;
      }

      // Вставляем задачу с иконками
      tasksList.insertAdjacentHTML(
        "beforeend",
        `
        <li class="list-group-item" id="${id}">
          <span class="task-title">${taskText}</span>
          <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-item btn-item-checkmark btn-action">
              ${doneIcon}
            </button>
            <button type="button" data-action="delete" class="btn-item btn-item-garbage btn-action">
              ${deleteIcon}
            </button>
          </div>
        </li>
      `
      );

      taskItem.remove();
      updateTitlesVisibility();
    } catch (error) {
      console.log(error);
    }
  }
}

function updateTitlesVisibility() {
  const allTaskLists = document.querySelectorAll("ul.list-group");
  const activeTasksList = allTaskLists[0];
  const doneTasksList = allTaskLists[1];

  const allTitles = document.querySelectorAll("h1.text");
  const activeTitle = allTitles[0];
  const doneTitle = allTitles[1];

  if (activeTasksList.children.length === 0) {
    activeTitle.classList.add("none");
  } else {
    activeTitle.classList.remove("none");
  }

  if (doneTasksList.children.length === 0) {
    doneTitle.classList.add("none");
  } else {
    doneTitle.classList.remove("none");
  }
}
