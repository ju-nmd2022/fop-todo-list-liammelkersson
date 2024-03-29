//To-do list done for an assignment
//Course: Foundations of programming
//Jönköping University 2023
//chatGPT helped explain localStorage in simple words

//Global HTML Elements
const addToDoButtonElement = document.getElementById("addToDo");
const toDoContainerElement = document.getElementById("toDoContainer");
const inputElement = document.getElementById("input");

//Global Variables
let tasks = [];
let task;

//Creates a new task when you click the "+"
addToDoButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createToDo();
  }
});

function createToDo() {
  //we don't want anything to be done when we first add something
  let done = false;

  //creating a container for each element
  const toDoElement = document.createElement("div");
  toDoElement.classList.add("to-do-div");
  toDoContainerElement.appendChild(toDoElement);

  //creating to do element for the text
  const toDoTextElement = document.createElement("p");
  toDoTextElement.classList.add("to-do-item");
  toDoTextElement.innerText = inputElement.value;
  toDoElement.appendChild(toDoTextElement);
  saveToDoList(inputElement.value, done);

  //creating remove button
  const removeButtonElement = document.createElement("button");
  removeButtonElement.classList.add("remove-button");
  removeButtonElement.innerText = "⌫";
  toDoElement.appendChild(removeButtonElement);

  //empty input after button has been pressed
  input.value = "";

  //Make the text have a line trough it to mark it as done
  toDoTextElement.addEventListener("click", () => {
    if (toDoTextElement.style.textDecoration !== "line-through") {
      toDoTextElement.style.textDecoration = "line-through";
      done = true;
    } else if (toDoTextElement.style.textDecoration === "line-through") {
      toDoTextElement.style.textDecoration = "none";
      done = false;
    }
  });

  //delete to-do items
  removeButtonElement.addEventListener("click", () => {
    toDoContainerElement.removeChild(toDoElement);

    // Get the tasks array from local storage
    let tasksFromStorage = JSON.parse(localStorage.getItem("task"));

    // Find the index of the task in the array that matches the clicked to-do item
    // Garrit suggested i use: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    let index = tasksFromStorage.findIndex(
      (task) => task.text === toDoTextElement.innerText
    );

    // If the index is found, remove the task from the array,
    // update local storage, and display the updated list
    if (index !== -1) {
      tasksFromStorage.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(tasksFromStorage));
      displayToDoList();
    }

    // Call the displayToDoList function to update the list
    displayToDoList();
  });
}

// here's a function for saving each tasks properties into an object
function saveToDoList(text, done) {
  const task = {
    text: text,
    done: done,
  };

  // Error checking (if localstorage is undefined make it an empty array)
  if (localStorage.task === undefined) {
    localStorage.task = JSON.stringify([]);
  }

  // Get the tasks array from local storage
  tasks = JSON.parse(localStorage.getItem("task"));

  // pushes the new const into local storage
  tasks.push(task);

  // saves the item into the local storage
  localStorage.setItem("task", JSON.stringify(tasks));
  displayToDoList();
}

// function for displaying/updating the task list
function displayToDoList() {
  if (localStorage.task !== undefined) {
    //remove it before displaying so we dont get double the amount of tasks
    toDoContainerElement.innerHTML = "";

    //get task list from storage
    let tasksFromStorage = JSON.parse(localStorage.getItem("task"));

    //creates tasks for each task in the task list
    for (let task of tasksFromStorage) {
      //creating a container for each element
      const toDoElement = document.createElement("div");
      toDoElement.classList.add("to-do-div");
      toDoContainerElement.appendChild(toDoElement);

      //creating to do element for the text
      const toDoTextElement = document.createElement("p");
      toDoTextElement.classList.add("to-do-item");

      toDoTextElement.innerText = task.text;
      toDoElement.appendChild(toDoTextElement);

      // set the textDecoration property based on the done-property saved in localStorage
      if (task.done === true) {
        toDoTextElement.style.textDecoration = "line-through";
      } else if (task.done === false) {
        toDoTextElement.style.textDecoration = "none";
      }

      toDoTextElement.addEventListener("click", () => {
        // get the tasks array from local storage
        let tasksFromStorage = JSON.parse(localStorage.getItem("task"));

        // find the index of the task in the array that matches the clicked to-do item
        let index = tasksFromStorage.findIndex(
          (task) => task.text === toDoTextElement.innerText
        );

        // if the index is found, remove the task from the array,
        // update local storage, and display the updated list
        if (index !== -1) {
          tasksFromStorage.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(tasksFromStorage));
          displayToDoList();
        }

        if (toDoTextElement.style.textDecoration !== "line-through") {
          toDoTextElement.style.textDecoration = "line-through";
          task.done = true;
        } else {
          toDoTextElement.style.textDecoration = "none";
          task.done = false;
        }
        saveToDoList(task.text, task.done);
        displayToDoList();
      });

      // creating remove button
      const removeButtonElement = document.createElement("button");
      removeButtonElement.classList.add("remove-button");
      removeButtonElement.innerText = "⌫";
      toDoElement.appendChild(removeButtonElement);

      removeButtonElement.addEventListener("click", () => {
        toDoContainerElement.removeChild(toDoElement);

        // get the tasks array from local storage
        let tasksFromStorage = JSON.parse(localStorage.getItem("task"));

        // find the index of the task in the array that matches the clicked to-do item
        let index = tasksFromStorage.findIndex(
          (task) => task.text === toDoTextElement.innerText
        );

        // if the index is found, remove the task from the array, update local storage, and display the updated list
        if (index !== -1) {
          tasksFromStorage.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(tasksFromStorage));
          displayToDoList();
        }
        // call the displayToDoList function to update the list
        displayToDoList();
      });
    }
  }
}

//loadhandler
function LoadHandler() {
  displayToDoList();
}
window.addEventListener("load", LoadHandler);
