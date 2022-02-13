const inputAddTask = document.getElementById("main-input--addtask");
const mainTasks = document.getElementById("taskList");
const localStorage = window.localStorage;
const inputTitleTask = document.getElementById("main-input--text");
localStorage.getItem("TaskList") ? true : localStorage.setItem("TaskList", [0]);
localStorage.getItem("ID") ? loadTasks() : localStorage.setItem("ID", 0);

function createTask(title) {
  let taskWrapper = document.createElement("form");
  taskWrapper.classList.add("tasks-form");
  let taskTitle = document.createElement("p");
  taskTitle.classList.add("tasks-form--title");
  taskTitle.textContent = title;
  let optionUpdate = document.createElement("input");
  optionUpdate.type = "button";
  optionUpdate.value = "ACTUALIZAR";
  optionUpdate.classList.add("tasks-form--options");
  optionUpdate.classList.add("tasks-form--options__update");
  optionUpdate.onclick = updateTask;
  let optionRemove = document.createElement("input");
  optionRemove.type = "button";
  optionRemove.value = "ELIMINAR";
  optionRemove.classList.add("tasks-form--options");
  optionRemove.classList.add("tasks-form--options__remove");
  optionRemove.onclick = removeTask;
  taskWrapper.appendChild(taskTitle);
  taskWrapper.appendChild(optionUpdate);
  taskWrapper.appendChild(optionRemove);
  return taskWrapper;
}

function addTask(title, status, id) {
  typeof title == "string" ? title : (title = inputTitleTask.value);
  title.length >= 5
    ? ((wrapper = createTask(title)),
      (wrapper.id = id),
      mainTasks.appendChild(wrapper),
      title != inputTitleTask.value
        ? true
        : saveTask(inputTitleTask.value, wrapper),
      (inputTitleTask.value = ""))
    : false;
}
function removeTask() {
  let taskList = localStorage.getItem("TaskList").split(" ");
  taskList.splice(taskList.indexOf(this.parentElement.id));
  taskList = taskList.join(" ");
  localStorage.setItem("TaskList", taskList);
  localStorage.removeItem(this.parentElement.id);
  this.parentElement.remove();
}

function generateID() {
  let ID = Number(localStorage.getItem("ID"));
  ID = Number(ID);
  ID++;
  localStorage.setItem("ID", ID);
  localStorage.setItem("TaskList", localStorage.getItem("TaskList") + " " + ID);
  ID = "Task-" + ID;
  return ID;
}
function saveTask(value, wrapper) {
  let newID = generateID();
  wrapper.id = newID;
  localStorage.setItem(newID, value);
}

function updateTask() {
  let Element = this.parentElement.children[0];
  let id = this.parentElement.id;
  !Element.contentEditable == "inherit" || Element.contentEditable == "true"
    ? ((Element.contentEditable = "false"),
      Element.classList.remove("task-form--title_updating"),
      (this.value = "ACTUALIZAR"),
      localStorage.setItem(id, Element.textContent))
    : ((Element.contentEditable = "true"),
      Element.classList.add("task-form--title_updating"),
      Element.focus(),
      (this.value = "CONFIRMAR"));
}

function loadTasks() {
  if (localStorage.length > 1) {
    localStorage
      .getItem("TaskList")
      .split(" ")
      .forEach((id) => {
        let title = "";
        id ? (title = localStorage.getItem("Task-" + id)) : null;
        !!title ? addTask(title, "loading", "Task-" + id) : null;
      });
  }
}
// localStorage.clear()
inputAddTask.addEventListener("click", addTask);
