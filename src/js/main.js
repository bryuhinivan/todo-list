import "../scss/style.scss";
import { doneIcon, deleteIcon } from "./icons.js"

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const tasksTitle = document.querySelector("#tasksTitle");

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);
document.querySelector('.completed-tasks').addEventListener('click', returnTask);

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  const taskHTML = `
                    <li class="list-group-item">
                    <span class="task-title">${taskText}</span>
                    <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-item btn-item-checkmark btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="24px" height="24px" fill-rule="nonzero"><g fill="#ab79e7" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M41.9375,8.625c-0.66406,0.02344 -1.27344,0.375 -1.625,0.9375l-18.8125,28.78125l-12.1875,-10.53125c-0.52344,-0.54297 -1.30859,-0.74609 -2.03125,-0.51953c-0.71875,0.22266 -1.25391,0.83203 -1.37891,1.57422c-0.125,0.74609 0.17578,1.49609 0.78516,1.94531l13.9375,12.0625c0.4375,0.37109 1.01563,0.53516 1.58203,0.45313c0.57031,-0.08594 1.07422,-0.41016 1.38672,-0.89062l20.09375,-30.6875c0.42969,-0.62891 0.46484,-1.44141 0.09375,-2.10547c-0.37109,-0.66016 -1.08594,-1.05469 -1.84375,-1.01953z"></path></g></g></svg>
                    </button>
    <button type="button" data-action="delete" class="btn-item btn-item-garbage btn-action">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="24px" height="24px" fill-rule="nonzero"><g fill="#ab79e7" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M21,2c-1.64545,0 -3,1.35455 -3,3v2h-7.8457c-0.05615,-0.00939 -0.113,-0.01396 -0.16992,-0.01367c-0.04844,0.00105 -0.09675,0.00562 -0.14453,0.01367h-1.83984c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h1v36c0,1.64545 1.35455,3 3,3h26c1.64545,0 3,-1.35455 3,-3v-36h1c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.83203c-0.10799,-0.01785 -0.21818,-0.01785 -0.32617,0h-7.8418v-2c0,-1.64545 -1.35455,-3 -3,-3zM21,4h8c0.55455,0 1,0.44545 1,1v2h-10v-2c0,-0.55455 0.44545,-1 1,-1zM11,9h7.83203c0.10799,0.01785 0.21818,0.01785 0.32617,0h11.67383c0.10799,0.01785 0.21818,0.01785 0.32617,0h7.8418v36c0,0.55454 -0.44546,1 -1,1h-26c-0.55454,0 -1,-0.44546 -1,-1zM18.98438,13.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v25c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-25c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM24.98438,13.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v25c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-25c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM30.98438,13.98633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v25c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-25c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212z"></path></g></g></svg>
    </button>
  </div>
</li>
`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 0) {
    tasksTitle.classList.remove("none");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item");
    parentNode.remove();
  }

  if (tasksList.children.length === 0) {
    tasksTitle.classList.add("none");
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    const taskText = taskTitle.textContent;

    const doneTaskHTML = `
      <li class="list-group-item">
        <span class="task-title done-task">${taskText}</span>
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
  }
}

function returnTask(event) {
  if (event.target.dataset.action === "return") {
    const taskItem = event.target.closest(".list-group-item");
    const taskText = taskItem.querySelector(".task-title").textContent;
    
    // Вставляем задачу с иконками
    tasksList.insertAdjacentHTML("beforeend", `
      <li class="list-group-item">
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
    `);
    
    taskItem.remove();
    updateTitlesVisibility();
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
