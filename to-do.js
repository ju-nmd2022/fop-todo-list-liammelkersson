//Global HTML Elements
const addToDoButtonElement = document.getElementById("addToDo");
const toDoContainerElement = document.getElementById("toDoContainer");
const inputElement = document.getElementById("input");
let tasks = [];
let task;

//Create a new to do item on click
addToDoButtonElement.addEventListener("click", () => {
  if (inputElement.value.length > 0) {
    createToDo();
  }
});

function createToDo() {
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
    let taskFromLS = JSON.parse(localStorage.getItem("task"));

    // Find the index of the task in the array that matches the clicked to-do item
    let index = taskFromLS.findIndex(
      (task) => task.text === toDoTextElement.innerText
    );

    // If the index is found, remove the task from the array, update local storage, and display the updated list
    if (index !== -1) {
      taskFromLS.splice(index, 1);
      localStorage.setItem("task", JSON.stringify(taskFromLS));
      displayToDoList();
    }

    // Call the displayToDoList function to update the list
    displayToDoList();
  });
}

function saveToDoList(text, done) {
  const task = {
    text: text,
    done: done,
  };

  //Error checking
  if (localStorage.task === undefined) {
    localStorage.task = JSON.stringify([]);
  }

  tasks = JSON.parse(localStorage.getItem("task"));
  tasks.push(task);
  localStorage.setItem("task", JSON.stringify(tasks));
  displayToDoList();
}

function displayToDoList() {
  if (localStorage.task !== undefined) {
    //remove it before displaying so we dont get doubles
    toDoContainerElement.innerHTML = "";

    let taskFromLS = JSON.parse(localStorage.getItem("task"));

    for (let task of taskFromLS) {
      //creating a container for each element
      const toDoElement = document.createElement("div");
      toDoElement.classList.add("to-do-div");
      toDoContainerElement.appendChild(toDoElement);

      //creating to do element for the text
      const toDoTextElement = document.createElement("p");
      toDoTextElement.classList.add("to-do-item");

      toDoTextElement.innerText = task.text;
      toDoElement.appendChild(toDoTextElement);

      // set the textDecoration property based on the done property saved in localStorage
      if (task.done === true) {
        toDoTextElement.style.textDecoration = "line-through";
      } else if (task.done === false) {
        toDoTextElement.style.textDecoration = "none";
      }

      toDoTextElement.addEventListener("click", () => {
        // Get the tasks array from local storage
        let taskFromLS = JSON.parse(localStorage.getItem("task"));

        // Find the index of the task in the array that matches the clicked to-do item
        let index = taskFromLS.findIndex(
          (task) => task.text === toDoTextElement.innerText
        );

        // If the index is found, remove the task from the array, update local storage, and display the updated list
        if (index !== -1) {
          taskFromLS.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(taskFromLS));
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

      //creating remove button
      const removeButtonElement = document.createElement("button");
      removeButtonElement.classList.add("remove-button");
      removeButtonElement.innerText = "⌫";
      toDoElement.appendChild(removeButtonElement);

      removeButtonElement.addEventListener("click", () => {
        toDoContainerElement.removeChild(toDoElement);

        // Get the tasks array from local storage
        let taskFromLS = JSON.parse(localStorage.getItem("task"));

        // Find the index of the task in the array that matches the clicked to-do item
        let index = taskFromLS.findIndex(
          (task) => task.text === toDoTextElement.innerText
        );

        // If the index is found, remove the task from the array, update local storage, and display the updated list
        if (index !== -1) {
          taskFromLS.splice(index, 1);
          localStorage.setItem("task", JSON.stringify(taskFromLS));
          displayToDoList();
        }
        // Call the displayToDoList function to update the list
        displayToDoList();
      });
    }
  }
}

function LoadHandler() {
  displayToDoList();
}
window.addEventListener("load", LoadHandler);
