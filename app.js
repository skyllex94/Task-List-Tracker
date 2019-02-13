// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListners();

function loadEventListners() {
  //DOM Load
  document.addEventListener("DOMContentLoaded", getTasks);
  //Submit Btn
  form.addEventListener("submit", addTask);
  // Remove task Event
  taskList.addEventListener("click", removeTask);
  // Clear All Event
  clearBtn.addEventListener("click", clearTasks);
  //Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const li = document.createElement("li");

    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));
    // Create new linkelemnt
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Didn't add any task!");
  }
  e.preventDefault();
  const li = document.createElement("li");

  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new linkelemnt
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  //Store Task in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function clearTasks() {
  // taskList.innerHTML = "";

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function removeTaskFromLocalStorage(item) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (item.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
