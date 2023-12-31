const input = document.querySelector("input");
const inputButton = document.querySelector(".create-task");
const allTasks = document.querySelector(".all-task");
const emptyList = document.querySelector(".tasks-list-cont")

let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(element => {
  const cssClass = element.done ? "tasks-list-task-name bg-grey-done" : "tasks-list-task-name";

  const createHTML = 
      `<div id="${element.id}" class="tasks-list-task">
        <p class="${cssClass}">${element.text}</p>
        <button class="done">✓</button>
        <button class="delete">x</button>
      </div>`;
  
  allTasks.insertAdjacentHTML("beforeend", createHTML);
});

if(tasks.length > 0) {
  emptyList.style.display = "none";
} else {
  emptyList.style.display = "flex";
}

// Добавление задачи
inputButton.onclick = () => {
  if (input.value === "") {
    return
  }

  const newTask = {
    id: Date.now(),
    text: input.value,
    done: false,
  }

  tasks.push(newTask);

  const cssClass = newTask.done ? "tasks-list-task-name bg-grey-done" : "tasks-list-task-name";

  const createHTML = 
      `<div id="${newTask.id}" class="tasks-list-task">
        <p class="${cssClass}">${newTask.text}</p>
        <button class="done">✓</button>
        <button class="delete">x</button>
      </div>`;
  
  allTasks.insertAdjacentHTML("beforeend", createHTML);

  input.value = "";
  input.focus();

  if(tasks.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }
  
  saveToLS();
}

// Удаление задачи и отметка задачи выполненной
allTasks.onclick = (event) => {
  if(event.target.classList.contains("delete")) {
    const id = event.target.closest(".tasks-list-task").id;

    const index = tasks.findIndex(function(task) {
      return task.id === +id;
    });

    tasks.splice(index, 1);

    event.target.closest(".tasks-list-task").remove();
  } else if(event.target.classList.contains("done")) {
    let parentNode = event.target.closest(".tasks-list-task");
    let textdone = parentNode.querySelector(".tasks-list-task-name");
    const id = parentNode.id;

    let task = tasks.find(function(task) {
      if (task.id === +id) {
        return true;
      }
    })

    if (task.done === false) {
      task.done = true;
      textdone.classList.add("bg-grey-done");
    } else if (task.done === true) {
      task.done = false;
      textdone.classList.remove("bg-grey-done");
    }
  }

  if(tasks.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }

  saveToLS();
}

function saveToLS() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelector(".button-delete-all").onclick = () => {
  let taskList = document.querySelectorAll(".bg-grey-done");

  for(let i of taskList) {
    const id = i.closest(".tasks-list-task").id;

    const index = tasks.findIndex(function(task) {
      return task.id === +id;
    });

    tasks.splice(index, 1);
    let parentNode = i.closest(".tasks-list-task");
    parentNode.remove();
  }

  if(tasks.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }

  saveToLS();
}