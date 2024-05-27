const input = document.querySelector(".input");
const submitButton = document.querySelector(".submit-btn");
const deleteButton = document.querySelector(".delete-btn");
const tasksContainer = document.querySelector(".tasks-conatiner");
const clearButton = document.querySelector(".clear-btn");
const totalTasksNumber = document.querySelector(".total");
const inprogressTasksNumber = document.querySelector(".inprogress");
const completedTasksNumber = document.querySelector(".completed-tasks-number");

let tasks = [];
console.log(inprogressTasksNumber);
console.log(completedTasksNumber);

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

getTasksFromLocalStorage();

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(input.value);

  if (input.value !== "") {
    console.log(input.value);
    addTaskToArray(input.value);
    input.value = "";
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();

    //Remove from localstorge
    deleteFromLocalstrogeById(e.target.parentElement.getAttribute("data-id"));
    console.log(e.target.parentElement);
  }
  if (e.target.classList.contains("task")) {
    markTaskAsCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("completed");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasks.push(task);
  addElementsToPage(tasks);
  addTasksToLocalStorage(tasks);
  count()
}

function addElementsToPage(arrayOfTasks) {
  tasksContainer.innerHTML = "";

  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task?.completed) {
      console.log(task?.completed);
      div.className = "task completed";
    }

    div.setAttribute("data-id", task?.id);
    div.appendChild(document.createTextNode(task?.title));

    let button = document.createElement("button");
    button.type = "button";
    button.className = "delete-btn";
    button.appendChild(document.createTextNode("Delete"));

    div.appendChild(button);

    tasksContainer.appendChild(div);
  });
}

function addTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPage(tasks);
  }
  count();
}

function deleteFromLocalstrogeById(id) {
  tasks = tasks.filter((task) => task.id != id);
  addTasksToLocalStorage(tasks);
  count();
}
function markTaskAsCompleted(id) {
  tasks.map((task) => {
    if (task.id == id) {
      !task.completed ? (task.completed = true) : (task.completed = false);
    }
  });
  addTasksToLocalStorage(tasks);
  count();
}

clearButton.onclick = () => {
  localStorage.setItem("tasks", []);
  tasks = [];
  addElementsToPage(tasks);
  totalTasksNumber.innerHTML = `Total Tasks: 0`;
  inprogressTasksNumber.innerHTML = `In Progress: 0`;
  completedTasksNumber.innerHTML = `Completed: 0`;
};

function count() {
  totalTasksNumber.innerHTML = `Total Tasks: ${tasks.length || 0}`;

  let pNumber = tasks.filter((t) => !t.completed).length;

  inprogressTasksNumber.innerHTML = `In Progress: ${pNumber || 0}`;

  let cNumber = tasks.filter((t) => t.completed).length;

  completedTasksNumber.innerHTML = `Completed: ${cNumber || 0}`;
}


