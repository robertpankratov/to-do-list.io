const input = document.querySelector("input");
const inputButton = document.querySelector(".create-task");
const allTasks = document.querySelector(".all-task");
const emptyList = document.querySelector(".tasks-list-cont")

if (localStorage.getItem("taskHTML")) {
  allTasks.innerHTML = localStorage.getItem("taskHTML");
  if(allTasks.children.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }
}

// Добавление задачи
inputButton.onclick = () => {
  const createHTML = 
      `<div class="tasks-list-task">
        <p class="tasks-list-task-name">${input.value}</p>
        <button class="done">✓</button>
        <button class="delete">x</button>
      </div>`;
  
  allTasks.insertAdjacentHTML("beforeend", createHTML);

  input.value = "";
  input.focus();

  if(allTasks.children.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }

  saveHTMLtoLS();
}

// Удаление задачи и отметка задачи выполненной
allTasks.onclick = (event) => {
  if(event.target.classList.contains("delete")) {
    event.target.closest(".tasks-list-task").remove();
  } else if(event.target.classList.contains("done")) {
    let parentNode = event.target.closest(".tasks-list-task");
    let textdone = parentNode.querySelector(".tasks-list-task-name");
    textdone.classList.add("bg-grey-done");
  }

  if(allTasks.children.length > 0) {
    emptyList.style.display = "none";
  } else {
    emptyList.style.display = "flex";
  }

  saveHTMLtoLS();
}

// Сохранение данных в localStorage
function saveHTMLtoLS() {
  localStorage.setItem('taskHTML', allTasks.innerHTML);
}